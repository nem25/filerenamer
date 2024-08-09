**Authors's note**: This project is completely generated using [Llamacoder](https://llamacoder.together.ai/) to create a preliminary codebase and then ChatGPT to grow it out. I am a coder but I don't know ReactJS or Typscript or Electron or etc. I wanted to explore how far I can build a project completely using gen AI. My journey is outlined at the [end](#my-experience-with-genai).

As this is all AI generated, please pardon any errors and other issues. If you find any, please do mark them so I can improve on it.

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

# My Experience with GenAI
and building this project...

## 7 August 2024
- I created a basic filerename app using Llamacoder. I had to run it locally on my machine because Llamacoder didn't allow external libraries like `axios` to run.
- When I ran it locally, it gave errors on the colour names in the CSS. After asking ChatGPT, it correctly identified missing import of Tailwind CSS.
- It did not actually rename the files but it was able to easily access the TMDB API and change any filenames I put in.
- To change filenames on the local machine, it suggested I use Electron.

## 8 August 2024
- I got ChatGPT to modularise the code rather than having everything in one file. It was a really good experience because every time a property changed in one file, it automatically informed me the other files dependent on that property and how I should change it.
- We even modularised further making common components for the HTML elements.
- A little more beautification was done by me uploading screenshots of the app to ChatGPT and marking areas that were problematic, like the input field was too close to a button. It accurately identified them by just looking at the screenshot.

## 9 August 2024
- After the last few days of discussion where it would output the whole `FileRenamer.tsx` file every time I requested a change, it now on its own has started to share only the functions that need to be updated.