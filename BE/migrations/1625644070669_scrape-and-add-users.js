/* eslint-disable camelcase */
const rp = require('request-promise');
const cheerio = require('cheerio');
const { trimText } = require('../lib/helpers');

const url = 'https://tretton37.com/meet';

function buildSQLStatementFromArray(arr) {
  let statement = `INSERT INTO users (name, office, github, twitter, linkedin, profileImg) VALUES `;
  arr.forEach(({ name, office, github, twitter, linkedin, imageUrl }, i) => {
    statement += `('${name}', '${office}', '${github}', '${twitter}', '${linkedin}', '${imageUrl}')`;

    statement += i === arr.length - 1 ? ';' : ', ';
  });
  return statement;
}

exports.shorthands = undefined;

exports.up = (pgm, run) => {
  rp(url)
    .then(function (html) {
      const $ = cheerio.load(html);
      const contacts = $('.ninja-summary > .contact-info > h1 > a');
      const images = $('.ninja-summary .portrait');
      const data = [];

      for (var i = 0; i < contacts.length; i++) {
        const name = contacts[i].children[0].data;
        const office = contacts[i].children[1].children[0].data;
        const image = images[i].attribs.src;

        data.push({
          name,
          imageUrl: image,
          office: office.substr(5, office.length),
          github: trimText(name),
          linkedin: trimText(name),
          twitter: trimText(name),
        });
      }

      pgm.sql(buildSQLStatementFromArray(data));
      run();
    })
    .catch(function (err) {
      console.error('err', err);
    });
};

exports.down = (pgm) => {};
