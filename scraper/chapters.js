const axios = require("axios");
const jsdom = require("jsdom");
const fs = require("fs");

const { JSDOM } = jsdom;

const begin = 1;
const end = 1070;
const chapters = [];

(async () => {
  try {
    for (let i = begin; i <= end; i++) {
      const data = await axios.get(
        `https://onepiece.fandom.com/wiki/Chapter_${i}`
      );
      const dom = new JSDOM(data.data);

      let title,
        number,
        volume,
        release,
        summary,
        cover,
        image,
        episodes = [];

      try {
        title = dom.window.document.querySelector(
          '[data-source="title"]'
        ).textContent;
      } catch (e) {
        title = null;
      }

      try {
        number = parseInt(
          dom.window.document.querySelectorAll('[data-source="chapter"]')[0]
            .children[1].textContent
        );
      } catch (e) {
        number = null;
      }

      try {
        volume = dom.window.document.querySelectorAll('[data-source="vol"]')[0]
          .children[1].children[0].textContent;
      } catch (e) {
        volume = null;
      }

      try {
        release = dom.window.document
          .querySelectorAll('[data-source="date2"]')[0]
          .children[1].textContent.replace("[ref]", "");
      } catch (e) {
        release = null;
      }

      try {
        summary = dom.window.document
          .querySelectorAll("#Short_Summary")[0]
          .parentElement.nextElementSibling.textContent.replace(
            /(<([^>]+)>)/gi,
            ""
          )
          .replace("\n", "");
      } catch (e) {
        summary = null;
      }

      try {
        cover = dom.window.document
          .querySelectorAll("#Cover_Page")[0]
          .parentElement.nextElementSibling.textContent.replace(
            /(<([^>]+)>)/gi,
            ""
          )
          .replace("\n", "");
      } catch (e) {
        cover = null;
      }

      try {
        image = dom.window.document
          .querySelectorAll(`[data-image-key="Chapter_${i}.png"]`)[0]
          .src.replace("scale-to-width-down/", "");
      } catch (e) {
        image = null;
      }

      try {
        const children = dom.window.document.querySelectorAll(
          '[data-source="anime"]'
        )[0].children[1].children;
        for (let i = 0; i < children.length; i++) {
          if (children[i].textContent) {
            const episode = parseInt(
              children[i].textContent.replace("Episode ", "")
            );
            if (!!episode) {
              episodes.push(episode);
            }
          }

          //if has innerHtml is an episode
        }
      } catch (e) {
        console.log("error ???", e);
        episodes = null;
      }

      const chapter = {
        title,
        number,
        volume,
        release,
        summary,
        cover,
        image,
        episodes,
      };

      console.log(`added chapter ${i}`);
      chapters.push(chapter);
    }
  } catch (e) {
    console.log("error", e);
  }

  fs.writeFile("chapters.json", JSON.stringify(chapters), function (err) {
    if (err) throw err;
    console.log("File is created successfully.");
  });
})();
