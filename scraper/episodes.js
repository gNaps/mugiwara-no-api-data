const axios = require("axios");
const jsdom = require("jsdom");
const fs = require('fs');


const { JSDOM } = jsdom;

const begin = 1;
const end = 1000;
const episodes = [];

(async () => {
    try {
        for(let i = begin; i <= end; i++) {
            const data = await axios.get(`https://onepiece.fandom.com/wiki/Episode_${i}`);
            const dom = new JSDOM(data.data);

            let title, number, volume, release, summary, cover, image, chapters = [];

            number = i;
            
            try {
                title = dom.window.document.querySelector('[data-source="Translation"]').textContent
            } catch(e) {
                title = null
            }

            try {
                release = dom.window.document.querySelectorAll('[data-source="Airdate"]')[0].children[1].textContent
            } catch(e) {
                release = null
            }

            // try {
            //     chapter = dom.window.document.querySelectorAll('[data-source="chapter"]')[0].children[1].textContent
            // } catch(e) {
            //     chapter = null
            // }

            try {
                summary = dom.window.document.querySelectorAll('#Short_Summary')[0].parentElement.nextElementSibling.textContent.replace(/(<([^>]+)>)/gi, "").replace('\n', '')
            } catch(e) {
                summary = null
            }

            try {
                image = dom.window.document.querySelectorAll(`[data-image-key="Episode_${i}.png"]`)[0].src.replace('scale-to-width-down/', '')
            } catch(e) {
                image = null
            }

            try {
                const children = dom.window.document.querySelectorAll('[data-source="chapter"]')[0].children[1].children
                for(let i = 0; i < children.length; i++) { 
                    if(children[i].textContent) chapters.push(children[i].textContent.replace('Episode ', ''))
                    //if has innerHtml is an episode
                }
            } catch(e) {
                console.log('error ???', e)
                chapters = null
            }

            

            const episode = {
                title,
                number,
                release,
                summary,
                image,
                chapters
            }

            console.log(`added episode ${i}`)
            episodes.push(episode);

        }
    } catch (e) {
        console.log('error', e)
    }

    fs.writeFile('episodes.json', JSON.stringify(episodes), function (err) {
        if (err) throw err;
        console.log('File is created successfully.');
      });
})();