const express = require("express");
const fs = require("fs");
const cors = require("cors")
const { appData } = require("./mock");
const app = express();
const PORT = 9000;

const _AUDIO_TYPE_ = {
  ROCK: "rock",
  JAZZ: "jazz",
  CINEMATIC: "cinematic",
  ACCOUSTIC: "accoustic",
};

function getDirectories(type) {
  return fs.readdirSync(`./music/${type}`);
}

function getSongDetails(type, dir) {
  try {
    const path = `music/${type}/${dir}/media`;
    const audioData = fs.readdirSync(path);
    const audioInfo = fs.readFileSync(`./music/${type}/${dir}/info.json`);
    const parsedData = JSON.parse(audioInfo);

    return {
      audioFile: `${path}/${audioData[0]}`,
      avatar: `${path}/${audioData[1]}`,
      ...parsedData,
    };
  } catch (error) {
    return false;
  }
}


app.use(cors())
app.use("/music", express.static("music"));




app.get(`/song`, (req, res) => {
  const songData = {};
  for (let type in _AUDIO_TYPE_) {
    // console.log(getDirectories(_AUDIO_TYPE_[type]));
    const directoryItems = getDirectories(_AUDIO_TYPE_[type]);
    directoryItems.forEach((item) => {
      const audioData = getSongDetails(_AUDIO_TYPE_[type], item);
      if (audioData) {
        // console.log({audioData});
        if (_AUDIO_TYPE_[type] in songData) {
          songData[_AUDIO_TYPE_[type]].push(audioData);
        } else {
          songData[_AUDIO_TYPE_[type]] = [audioData];
        }
      }
    });
  }

  appData["freelicence"] = songData;
  res.status(200).json({ appData });
  // res.status(200).json({songData})
  // res.send("Hello from server")
  // console.log("Hello from server");
});

app.listen(PORT, () => {
  console.log(`server listen at port ${PORT}`);
});
