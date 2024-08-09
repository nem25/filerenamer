Authors's note: This file is completely generated using [Llamacoder](https://llamacoder.together.ai/) to create a preliminary codebase and then ChatGPT to grow it out. I am a coder but I don't know ReactJS or Typscript or Electron or etc. I wanted to explore how far I can build a project completely using gen AI. I will post my experience here.

### `README.md`

# File Renamer

## Overview

File Renamer is a React and TypeScript-based application designed to help users rename media files by searching for relevant movie or TV show information using the TMDB API. The application is enhanced with Electron to provide a desktop application experience.

## Features

- Add media files to the list.
- Search for relevant movie/TV show information using the TMDB API.
- Rename files based on search results.
- Remove files from the list.
- Desktop application support using Electron.

## Getting Started

### Prerequisites

- Node.js (v12 or higher)
- npm or yarn

### Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/your-username/file-renamer.git
    cd file-renamer
    ```

2. Install the dependencies:
    ```sh
    npm install
    # or
    yarn install
    ```

3. Create a `.env` file in the root directory with your TMDB API key:
    ```env
    REACT_APP_TMDB_API_KEY=your_tmdb_api_key
    ```

### Running the Application

To run the React application:

```sh
npm start
# or
yarn start
```

To run the Electron application:

```sh
npm run electron
# or
yarn electron
```

## Usage

1. Click the "Add File" button to add a media file.
2. The file details will be displayed in a bordered box.
3. Click the "Search" button to search for relevant movie/TV show information.
4. Select a new name from the search results dropdown.
5. The file will be renamed based on the selected result.
6. Click the `x` button to remove the file from the list.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any changes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
