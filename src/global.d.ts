interface IElectronAPI {
    renameFile: (oldPath: string, newPath: string) => void;
    onRenameFileResponse: (callback: (event: any, response: string) => void) => void;
  }
  
  interface Window {
    electron: IElectronAPI;
  }
  