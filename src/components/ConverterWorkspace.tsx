"use client";

import React, { useState, useRef } from 'react';
import { UploadCloud, FileImage, FileVideo, FileAudio, FileText, FileArchive, File as FileIcon, Trash2, ArrowRightCircle, CheckCircle2, Loader2, Settings, AlertCircle, FolderInput, FilePlus } from 'lucide-react';

import { FORMAT_MAPPINGS } from '@/lib/config';
import { saveFileState, getFileStates, removeFileState } from '@/lib/storage';
import AdBanner from '@/components/AdBanner';
import ResponsiveAd from '@/components/ResponsiveAd';

function getSessionId() {
  if (typeof document === 'undefined') return '';
  const match = document.cookie.match(new RegExp('(^| )aio_session=([^;]+)'));
  if (match) return match[2];
  const newSessionId = Math.random().toString(36).substring(2) + Date.now().toString(36);
  // 30 days expiry
  document.cookie = `aio_session=${newSessionId}; path=/; max-age=2592000; SameSite=Strict`;
  return newSessionId;
}

type FileCategory = 'image' | 'video' | 'audio' | 'document' | 'archive' | 'unknown';

type FileItem = {
  id: string;
  jobId?: string; // Add jobId for tracking
  file: File;
  category: FileCategory;
  targetFormat: string;
  status: 'idle' | 'uploading' | 'converting' | 'done' | 'error';
  progress: number;
  downloadUrl?: string;
  errorMessage?: string;
};

const getFileCategory = (file: File): FileCategory => {
  if (file.type.startsWith('image/')) return 'image';
  if (file.type.startsWith('video/')) return 'video';
  if (file.type.startsWith('audio/')) return 'audio';
  if (file.type.includes('pdf') || file.type.includes('document') || file.type.includes('text')) return 'document';
  if (file.type.includes('zip') || file.type.includes('tar') || file.type.includes('compressed')) return 'archive';
  
  const ext = file.name.split('.').pop()?.toLowerCase();
  if (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(ext || '')) return 'image';
  if (['mp4', 'mkv', 'avi', 'mov'].includes(ext || '')) return 'video';
  if (['mp3', 'wav', 'ogg'].includes(ext || '')) return 'audio';
  if (['pdf', 'doc', 'docx', 'txt', 'json', 'xml', 'csv'].includes(ext || '')) return 'document';
  if (['zip', 'rar', '7z', 'tar'].includes(ext || '')) return 'archive';
  
  return 'unknown';
};

const getCategoryIcon = (category: FileCategory) => {
  switch (category) {
    case 'image': return <FileImage size={24} className="text-blue-500" />;
    case 'video': return <FileVideo size={24} className="text-purple-500" />;
    case 'audio': return <FileAudio size={24} className="text-yellow-500" />;
    case 'document': return <FileText size={24} className="text-green-500" />;
    case 'archive': return <FileArchive size={24} className="text-red-500" />;
    default: return <FileIcon size={24} className="text-gray-500" />;
  }
};

type BulkGroup = {
  ext: string;
  category: FileCategory;
  files: File[];
  targetFormat: string;
};

export default function ConverterWorkspace({ initialCategory, initialFromFormat, initialToFormat }: { initialCategory?: string, initialFromFormat?: string, initialToFormat?: string }) {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  
  // Bulk Setup State
  const [bulkGroups, setBulkGroups] = useState<BulkGroup[]>([]);
  const [showBulkSetup, setShowBulkSetup] = useState(false);

  React.useEffect(() => {
    const sessionId = getSessionId();
    
    const handleExit = () => {
      if (navigator.sendBeacon) {
        navigator.sendBeacon('/api/cleanup', sessionId);
      }
    };
    
    window.addEventListener('pagehide', handleExit);
    
    getFileStates().then(persistedFiles => {
      if (persistedFiles && persistedFiles.length > 0) {
        const loadedItems: FileItem[] = persistedFiles.map(p => ({
          id: p.id,
          file: p.file,
          category: p.category as FileCategory,
          targetFormat: p.targetFormat,
          status: 'idle',
          progress: 0
        }));
        setFiles(loadedItems);
      }
    });

    return () => window.removeEventListener('pagehide', handleExit);
  }, []);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const folderInputRef = useRef<HTMLInputElement>(null);
  const dropzoneRef = useRef<HTMLElement>(null);
  const filesQueuedRef = useRef<HTMLDivElement>(null);

  const prevFilesLength = useRef(0);
  React.useEffect(() => {
    if (prevFilesLength.current === 0 && files.length > 0) {
      setTimeout(() => {
        filesQueuedRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
    prevFilesLength.current = files.length;
  }, [files.length]);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processIncomingFiles(Array.from(e.dataTransfer.files));
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processIncomingFiles(Array.from(e.target.files));
    }
    // Reset input so the same files can be selected again if needed
    e.target.value = '';
  };

  const processIncomingFiles = (newFiles: File[]) => {
    if (newFiles.length === 0) return;

    // Filter out hidden files like .DS_Store
    const validFiles = newFiles.filter(f => !f.name.startsWith('.'));
    
    const supportedFiles: File[] = [];
    const unsupportedFiles: File[] = [];
    
    validFiles.forEach(file => {
      const category = getFileCategory(file);
      const availableFormats = category !== 'unknown' ? FORMAT_MAPPINGS[category] : [];
      if (category === 'unknown' || availableFormats.length === 0) {
        unsupportedFiles.push(file);
      } else {
        supportedFiles.push(file);
      }
    });

    // Group supported files by extension
    const groupsMap = new Map<string, File[]>();
    supportedFiles.forEach(file => {
      const ext = (file.name.split('.').pop() || 'unknown').toLowerCase();
      if (!groupsMap.has(ext)) groupsMap.set(ext, []);
      groupsMap.get(ext)!.push(file);
    });

    // Immediately queue unsupported files to show error state
    if (unsupportedFiles.length > 0) {
      addFilesToQueue(unsupportedFiles);
    }

    // If it's a bulk upload with multiple supported extensions, show bulk setup
    if (groupsMap.size > 1 && supportedFiles.length > 1) {
      const newBulkGroups: BulkGroup[] = Array.from(groupsMap.entries()).map(([ext, groupFiles]) => {
        const category = getFileCategory(groupFiles[0]);
        const availableFormats = category !== 'unknown' ? FORMAT_MAPPINGS[category] : [];
        let targetFormat = availableFormats.find(f => f !== ext) || availableFormats[0] || '';
        
        if (initialToFormat && availableFormats.includes(initialToFormat)) {
          targetFormat = initialToFormat;
        }

        return { ext, category, files: groupFiles, targetFormat };
      });

      setBulkGroups(prev => [...prev, ...newBulkGroups]);
      setShowBulkSetup(true);
    } else if (supportedFiles.length > 0) {
      // Direct add
      addFilesToQueue(supportedFiles);
    }
  };

  const addFilesToQueue = (filesToAdd: File[], specificTargetFormats?: Record<string, string>) => {
    const newItems: FileItem[] = filesToAdd.map(file => {
      const category = getFileCategory(file);
      const availableFormats = category !== 'unknown' ? FORMAT_MAPPINGS[category] : [];
      const ext = (file.name.split('.').pop() || '').toLowerCase();
      
      let targetFormat = availableFormats.find(f => f !== ext) || availableFormats[0] || '';
      
      if (specificTargetFormats && specificTargetFormats[ext]) {
        targetFormat = specificTargetFormats[ext];
      } else if (initialToFormat && availableFormats.includes(initialToFormat)) {
        targetFormat = initialToFormat;
      }
      
      const isUnsupported = category === 'unknown' || availableFormats.length === 0;

      const id = Math.random().toString(36).substring(7);
      
      if (!isUnsupported) {
        saveFileState(id, file, category, targetFormat);
      }
      
      return {
        id,
        file,
        category,
        targetFormat: isUnsupported ? '' : targetFormat,
        status: isUnsupported ? 'error' : 'idle',
        progress: 0,
        errorMessage: isUnsupported ? 'Cannot convert this file' : undefined
      };
    });
    setFiles(prev => [...prev, ...newItems]);
  };

  const handleBulkSetupConfirm = () => {
    const specificFormats: Record<string, string> = {};
    const allFiles: File[] = [];
    
    bulkGroups.forEach(group => {
      specificFormats[group.ext] = group.targetFormat;
      allFiles.push(...group.files);
    });

    addFilesToQueue(allFiles, specificFormats);
    setShowBulkSetup(false);
    setBulkGroups([]);
  };

  const removeFile = (id: string) => {
    setFiles(prev => prev.filter(f => f.id !== id));
    removeFileState(id);
  };

  const removeBulkGroup = (ext: string) => {
    setBulkGroups(prev => prev.filter(g => g.ext !== ext));
    if (bulkGroups.length <= 1) {
      setShowBulkSetup(false);
      setBulkGroups([]);
    }
  };

  const updateFormat = (id: string, format: string) => {
    setFiles(prev => {
      const updated = prev.map(f => f.id === id ? { ...f, targetFormat: format } : f);
      const changed = updated.find(f => f.id === id);
      if (changed) {
        saveFileState(id, changed.file, changed.category, format);
      }
      return updated;
    });
  };

  const updateBulkGroupFormat = (ext: string, format: string) => {
    setBulkGroups(prev => prev.map(g => g.ext === ext ? { ...g, targetFormat: format } : g));
  };

  const handleConvert = async () => {
    // Start uploads for all idle files
    const idleFiles = files.filter(f => f.status === 'idle');
    if (idleFiles.length === 0) return;

    setFiles(prev => prev.map(f => f.status === 'idle' ? { ...f, status: 'uploading', progress: 0 } : f));
    
    // Process uploads concurrently
    idleFiles.forEach(async (fileItem) => {
      try {
        const formData = new FormData();
        formData.append('file', fileItem.file);
        formData.append('category', fileItem.category);
        formData.append('targetFormat', fileItem.targetFormat);
        formData.append('sessionId', getSessionId());

        // Upload phase with progress tracking
        const jobId = await new Promise<string>((resolve, reject) => {
          const xhr = new XMLHttpRequest();
          xhr.open('POST', '/api/upload', true);
          
          xhr.upload.onprogress = (event) => {
            if (event.lengthComputable) {
              const progress = Math.round((event.loaded / event.total) * 100);
              setFiles(prev => prev.map(f => f.id === fileItem.id ? { ...f, progress } : f));
            }
          };

          xhr.onload = () => {
            if (xhr.status >= 200 && xhr.status < 300) {
              try {
                const res = JSON.parse(xhr.responseText);
                resolve(res.jobId);
              } catch (e) {
                reject(new Error('Invalid response'));
              }
            } else {
              reject(new Error('Upload failed'));
            }
          };

          xhr.onerror = () => reject(new Error('Network error'));
          xhr.send(formData);
        });

        setFiles(prev => prev.map(f => f.id === fileItem.id ? { ...f, status: 'converting', progress: 0, jobId } : f));

        // Polling phase
        const pollStatus = async () => {
          try {
            const statusRes = await fetch(`/api/status/${jobId}`);
            if (!statusRes.ok) throw new Error('Status check failed');
            
            const data = await statusRes.json();

            if (data.status === 'done') {
              setFiles(prev => prev.map(f => f.id === fileItem.id ? { ...f, status: 'done', progress: 100, downloadUrl: data.downloadUrl } : f));
            } else if (data.status === 'error') {
              setFiles(prev => prev.map(f => f.id === fileItem.id ? { ...f, status: 'error', progress: 0, errorMessage: data.error } : f));
            } else {
              // Still processing
              setFiles(prev => prev.map(f => f.id === fileItem.id ? { ...f, progress: data.progress } : f));
              setTimeout(pollStatus, 500); // Poll again
            }
          } catch (err) {
             console.error(err);
             setTimeout(pollStatus, 1500); // Retry polling if network drops briefly
          }
        };

        // Start polling
        setTimeout(pollStatus, 500);

      } catch (err: any) {
        setFiles(prev => prev.map(f => f.id === fileItem.id ? { ...f, status: 'error', errorMessage: err.message } : f));
      }
    });
  };

  return (
    <section id="convert" ref={dropzoneRef} className="workspace-section-padding" style={{ maxWidth: '1000px', margin: '0 auto', width: '100%', padding: '2rem' }}>
      <div 
        className="glass-panel workspace-panel-padding" 
        style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem', padding: '2.5rem' }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700 }}>Conversion Workspace</h2>
            <p style={{ color: 'var(--secondary-foreground)', opacity: 0.8 }}>Advanced multi-thread processing engine</p>
          </div>
          <Settings size={24} color="var(--secondary-foreground)" style={{ cursor: 'pointer' }} />
        </div>

        {/* Show Bulk Setup UI if triggered */}
        {showBulkSetup ? (
          <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
             <div style={{ padding: '1.5rem', backgroundColor: 'rgba(59, 130, 246, 0.05)', border: '1px solid var(--border)', borderRadius: '16px' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.5rem' }}>Bulk Folder Conversion Setup</h3>
                <p style={{ color: 'var(--secondary-foreground)', fontSize: '0.95rem' }}>We detected multiple file types. Choose the target formats for each group.</p>
             </div>

             <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {bulkGroups.map((group) => (
                  <div key={group.ext} className="bulk-item-row" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.25rem', backgroundColor: '#ffffff', border: '1px solid var(--border)', borderRadius: '12px', boxShadow: 'var(--shadow-sm)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <div style={{ padding: '0.75rem', backgroundColor: 'var(--background)', borderRadius: '12px' }}>
                         {getCategoryIcon(group.category)}
                      </div>
                      <div>
                        <div style={{ fontWeight: 600, fontSize: '1.1rem' }}>{group.ext.toUpperCase()} Files</div>
                        <div style={{ fontSize: '0.85rem', color: 'var(--secondary-foreground)' }}>{group.files.length} files detected</div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <span style={{ fontSize: '0.9rem', color: 'var(--secondary-foreground)' }}>Convert all to:</span>
                      <select 
                        value={group.targetFormat}
                        onChange={(e) => updateBulkGroupFormat(group.ext, e.target.value)}
                        style={{ padding: '0.6rem 1rem', borderRadius: '8px', border: '1px solid var(--border)', outline: 'none', background: 'var(--background)', fontWeight: 600 }}
                      >
                        {(group.category !== 'unknown' ? FORMAT_MAPPINGS[group.category] : []).map(f => (
                          <option key={f} value={f}>{f.toUpperCase()}</option>
                        ))}
                      </select>
                      <button 
                        onClick={() => removeBulkGroup(group.ext)}
                        style={{ background: 'white', border: '1px solid var(--border)', cursor: 'pointer', color: 'var(--destructive-foreground)', padding: '0.6rem', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s' }}
                        onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'var(--destructive)'}
                        onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'white'}
                        title="Remove this group"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                ))}
             </div>

             <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
                <button onClick={() => { setShowBulkSetup(false); setBulkGroups([]); }} className="btn btn-secondary">Cancel</button>
                <button onClick={handleBulkSetupConfirm} className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <CheckCircle2 size={18} /> Confirm & Add to Queue
                </button>
             </div>
          </div>
        ) : (
          <>
            {/* Advanced Dropzone */}
            <div 
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              style={{
                border: `1.5px dashed ${isDragging ? 'var(--primary)' : 'var(--border)'}`,
                borderRadius: '24px',
                padding: '4rem 2rem',
                textAlign: 'center',
                backgroundColor: isDragging ? 'rgba(0, 0, 0, 0.02)' : '#ffffff',
                transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '1.25rem',
                boxShadow: isDragging ? 'var(--shadow-md)' : 'var(--shadow-sm)'
              }}
            >
              <div style={{ 
                background: 'var(--background)', 
                color: 'var(--foreground)',
                padding: '1.25rem', 
                borderRadius: '50%',
                transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                transform: isDragging ? 'scale(1.1) translateY(-5px)' : 'scale(1)',
                boxShadow: 'var(--shadow-sm)',
                border: '1px solid var(--border)'
              }}>
                <UploadCloud size={40} strokeWidth={1.5} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.35rem', fontWeight: 600, marginBottom: '0.5rem', letterSpacing: '-0.02em' }}>Upload your files</h3>
                <p style={{ color: 'var(--secondary-foreground)', fontSize: '0.95rem' }}>Drag and drop anywhere, or use the buttons below</p>
              </div>
              
              <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
                <button onClick={() => fileInputRef.current?.click()} className="btn btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <FilePlus size={18} /> Select Files
                </button>
              </div>

              <input 
                type="file" 
                multiple 
                ref={fileInputRef} 
                onChange={handleFileSelect} 
                style={{ display: 'none' }} 
              />
            </div>

            {/* Advanced File List */}
            {files.length > 0 && (
              <div ref={filesQueuedRef} className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <ResponsiveAd margin="1rem 0" />
                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '1rem', borderBottom: '1px solid var(--border)' }}>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ background: 'var(--primary)', color: 'white', padding: '0.2rem 0.6rem', borderRadius: '1rem', fontSize: '0.875rem' }}>
                      {files.length}
                    </span>
                    Files Queued
                  </h3>
                  <div style={{ display: 'flex', gap: '1rem' }}>
                    <button 
                      onClick={() => {
                        files.forEach(f => removeFileState(f.id));
                        setFiles([]);
                      }} 
                      className="btn btn-secondary" 
                      style={{ padding: '0.75rem 1.25rem', color: 'var(--destructive-foreground)' }}
                    >
                      Clear All
                    </button>
                    <button onClick={handleConvert} className="btn btn-primary" style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', padding: '0.75rem 1.5rem' }}>
                      <ArrowRightCircle size={20} /> Process All Files
                    </button>
                  </div>
                </div>
                
                <ResponsiveAd margin="1rem 0" />
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {files.map(file => (
                    <div key={file.id} className="file-item-row">
                      {/* Progress Bar Background */}
                      {(file.status === 'converting' || file.status === 'done') && (
                        <div style={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          height: '100%',
                          width: `${file.progress}%`,
                          backgroundColor: 'rgba(0, 0, 0, 0.03)',
                          transition: 'width 0.3s ease',
                          zIndex: 0
                        }} />
                      )}

                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: 1, zIndex: 1 }}>
                        <div style={{ padding: '0.75rem', backgroundColor: 'var(--background)', borderRadius: '0.75rem', border: '1px solid var(--border)' }}>
                          {getCategoryIcon(file.category)}
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                          <span style={{ fontWeight: 600, fontSize: '1.05rem', color: 'var(--foreground)' }}>{file.file.name}</span>
                          <div style={{ display: 'flex', gap: '1rem', fontSize: '0.85rem', color: 'var(--secondary-foreground)', marginTop: '0.2rem' }}>
                            <span>{(file.file.size / 1024 / 1024).toFixed(2)} MB</span>
                            <span style={{ textTransform: 'uppercase', background: 'var(--secondary)', padding: '0.1rem 0.4rem', borderRadius: '0.25rem', fontSize: '0.75rem', fontWeight: 600 }}>{file.category}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="file-item-actions" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', zIndex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                          <span style={{ fontSize: '0.85rem', color: 'var(--secondary-foreground)', fontWeight: 500 }}>to</span>
                          <select 
                            value={file.targetFormat}
                            onChange={(e) => updateFormat(file.id, e.target.value)}
                            disabled={file.status !== 'idle'}
                            style={{
                              padding: '0.5rem 1rem',
                              borderRadius: '8px',
                              border: '1px solid var(--border)',
                              outline: 'none',
                              background: 'var(--background)',
                              fontWeight: 500,
                              fontSize: '0.9rem',
                              cursor: file.status === 'idle' ? 'pointer' : 'not-allowed',
                              minWidth: '90px'
                            }}
                          >
                            {(file.category !== 'unknown' ? FORMAT_MAPPINGS[file.category] : []).map(f => (
                              <option key={f} value={f}>{f.toUpperCase()}</option>
                            ))}
                          </select>
                        </div>
                        
                    <div style={{ width: '130px', display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '1rem' }}>
                      {file.status === 'uploading' && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--secondary-foreground)', fontWeight: 600, fontSize: '0.9rem' }}>
                          <Loader2 size={18} className="animate-spin" /> Uploading {Math.round(file.progress)}%
                        </div>
                      )}

                      {file.status === 'converting' && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary)', fontWeight: 600, fontSize: '0.9rem' }}>
                          <Loader2 size={18} className="animate-spin" /> Converting...
                        </div>
                      )}
                      
                      {file.status === 'done' && (
                        <a href={file.downloadUrl} download className="btn btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.875rem', textDecoration: 'none', display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
                          <CheckCircle2 size={16} /> Download
                        </a>
                      )}
                      
                      {file.status === 'error' && (
                        <div style={{ color: 'var(--destructive-foreground)', display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem' }} title={file.errorMessage}>
                          <AlertCircle size={18} /> Error
                        </div>
                      )}
                      
                      {(file.status === 'idle' || file.status === 'error') && (
                        <button 
                          onClick={() => removeFile(file.id)}
                          style={{ background: 'white', border: '1px solid var(--border)', cursor: 'pointer', color: 'var(--destructive-foreground)', padding: '0.5rem', borderRadius: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s' }}
                          onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'var(--destructive)'}
                          onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'white'}
                        >
                          <Trash2 size={18} />
                        </button>
                      )}
                    </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Ad when download buttons appear */}
                {files.some(f => f.status === 'done') && (
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '2rem', gap: '1rem' }}>
                    <button 
                      onClick={() => {
                        const sessionId = getSessionId();
                        removeFileState(sessionId);
                        setFiles([]);
                        setTimeout(() => {
                          dropzoneRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }, 50);
                      }}
                      className="btn btn-secondary" 
                      style={{ padding: '0.8rem 2.5rem', fontSize: '1.05rem', fontWeight: 600, display: 'flex', gap: '0.5rem', alignItems: 'center', backgroundColor: 'var(--foreground)', color: 'var(--background)' }}
                    >
                      <FilePlus size={20} /> Convert Another File
                    </button>
                    <ResponsiveAd margin="1rem 0" />

                    <div style={{ 
                      marginTop: '1rem', 
                      padding: '2rem', 
                      backgroundColor: 'rgba(0,0,0,0.02)', 
                      border: '1px solid var(--border)', 
                      borderRadius: '16px', 
                      textAlign: 'center',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '1.25rem',
                      maxWidth: '600px',
                      width: '100%'
                    }}>
                      <div>
                        <h4 style={{ color: 'var(--foreground)', fontWeight: 700, fontSize: '1.2rem', marginBottom: '0.5rem' }}>More Free Tools</h4>
                        <p style={{ color: 'var(--secondary-foreground)', lineHeight: 1.6, fontSize: '0.95rem' }}>
                          AIOConvert is part of the ViteNest ecosystem. Discover more premium free tools designed to boost your productivity.
                        </p>
                      </div>
                      <a 
                        href="https://vitenest.com/products" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        style={{ 
                          display: 'inline-flex', 
                          alignItems: 'center', 
                          gap: '0.5rem', 
                          padding: '0.75rem 1.5rem', 
                          backgroundColor: 'rgba(0,0,0,0.04)', 
                          border: '1px solid var(--border)',
                          borderRadius: '12px', 
                          color: 'var(--foreground)', 
                          textDecoration: 'none', 
                          fontWeight: 600, 
                          fontSize: '1rem',
                          transition: 'all 0.2s ease'
                        }}
                        onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.08)'}
                        onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.04)'}
                      >
                        <span style={{ fontSize: '1.2rem' }}>✨</span> Explore All ViteNest Tools
                      </a>
                    </div>
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
