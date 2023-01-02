const mongoose = require("mongoose");
const volumes = require("../data/volumes.json");
const chapters = require("../data/chapters.json");
const episodes = require("../data/episodes.json");
const sagas = require("../data/sagas.json");
const { Volume } = require("./Volume");
const { Chapter } = require("./Chapter");
const { Episode } = require("./Episode");
const { Saga } = require("./Saga");

(async () => {
  console.log("Start migration");
  mongoose.connect(
    "mongodb+srv://napsryu:Gabrielemats1996!@cluster0.cdmmoqv.mongodb.net/?retryWrites=true&w=majority",
    {
      dbName: "mugiwara_no_api",
    }
  );

  // VOLUMES

  console.log("Deleting all volumes...");
  await Volume.deleteMany({});

  console.log("Insert all volumes...");

  try {
    for (const v of volumes) {
      const { number, title, chapters, summary } = v;
      const volume = new Volume({ number, title, chapters, summary });
      await volume.save();

      console.log(`Saved volume ${number}`);
    }
  } catch (err) {
    console.log("Error!", err);
  }

  // CHAPTER

  console.log("Deleting all chapters...");
  await Chapter.deleteMany({});

  console.log("Insert all chapters...");

  try {
    for (const c of chapters) {
      const {
        title,
        number,
        volume,
        release,
        summary,
        cover,
        episodes,
        image,
      } = c;
      const chapter = new Chapter({
        title,
        number,
        volume,
        release,
        summary,
        cover,
        episodes,
        image,
      });
      await chapter.save();

      console.log(`Saved chapter ${number}`);
    }
  } catch (err) {
    console.log("Error!", err);
  }

  // EPISODES

  console.log("Deleting all episodes...");
  await Episode.deleteMany({});

  console.log("Insert all episodes...");

  try {
    for (const e of episodes) {
      const { title, number, release, summary, chapters, image } = e;
      const episode = new Episode({
        title,
        number,
        release,
        summary,
        chapters,
        image,
      });
      await episode.save();

      console.log(`Saved episode ${number}`);
    }
  } catch (err) {
    console.log("Error!", err);
  }

  // SAGAS

  console.log("Deleting all sagas...");
  await Saga.deleteMany({});

  console.log("Insert all sagas...");

  try {
    for (const s of sagas) {
      const { name, summary, chapters, episodes, volumes } = s;
      const saga = new Saga({
        name,
        summary,
        chapters,
        episodes,
        volumes,
      });
      await saga.save();

      console.log(`Saved saga ${name}`);
    }
  } catch (err) {
    console.log("Error!", err);
  }

  console.log("END");
})();
