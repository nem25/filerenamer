import React, { useEffect } from 'react';

interface RenameFileHandlerProps {
  onRenameFileResponse: (response: string) => void;
}

const RenameFileHandler: React.FC<RenameFileHandlerProps> = ({ onRenameFileResponse }) => {
  useEffect(() => {
    const renameFileResponseHandler = (event: any, response: string) => {
      onRenameFileResponse(response);
    };
    window.electron.onRenameFileResponse(renameFileResponseHandler);
    return () => {
      window.electron.onRenameFileResponse(() => {}); // Clean up
    };
  }, [onRenameFileResponse]);

  return null;
};

export default RenameFileHandler;
