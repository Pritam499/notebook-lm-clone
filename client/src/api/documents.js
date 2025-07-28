import api from './index';

export async function uploadDocument(file, onProgress) {
  const form = new FormData();
  form.append('file', file);

  const resp = await api.post('/documents', form, {
    headers: { 'Content-Type': 'multipart/form-data' },
    onUploadProgress: (e) => onProgress?.(Math.round((e.loaded * 100) / e.total)),
  });
  return resp.data;
}