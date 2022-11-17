const PROGRAM = {
  NAME: 'wpg',
  USAGE: '<command> [options]'
};

const STATUS_MESSAGES = {
  COMMAND_INIT: 'Initializing the webpack generator...',
  COMMAND_INIT_INSTALL: 'Installing webpack dependencies...',
  COMMAND_NOT_FOUND: 'Command not found',
  COPY_FILES: 'Copying files...',
  FILES_COPIED: 'Files copied successfully',
  DIRECTORY_ALREADY_EXISTS: 'Directory already exists',
  DIRECTORY_ALREADY_EXISTS_QUESTION: 'The directory already exists, do you want to overwrite the directory and its contents?',
  DIRECTORY_CREATED: 'Directory created',
  DIRECTORY_NOT_FOUND: 'Directory not found',
  DIRECTORY_REMOVED: 'Directory removed',
  DIRECTORY_REMOVING: 'Removing directory...',
  DIRECTORY_OVERWRITING : 'Overwriting directory...',
  DIRECTORY_SUCCESSFULLY_CREATED: 'Directory successfully created',
  DIRECTORY_SUCCESSFULLY_OVERWRITTEN: 'Directory successfully overwritten',
  DIRECTORY_OVERWRITTEN_ABORTED: 'The folder overwrite process has been aborted by the user',
  DIRECTORY_SUCCESSFULLY_REMOVED: 'Directory successfully removed',
  INITIALIZING_PROJECT: 'Initializing project',
  PROCESS_CANCELLED: 'Process cancelled',
  PROCESS_COMPLETED: 'Process completed',
  PROCESS_ERROR: 'Process error',
  PROJECT_SUCCESSFULLY_GENERATED: 'Project successfully generated',
};

export { PROGRAM, STATUS_MESSAGES };
