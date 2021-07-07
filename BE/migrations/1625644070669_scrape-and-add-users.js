/* eslint-disable camelcase */
const rp = require('request-promise');
const cheerio = require('cheerio');
const { trimText } = require('../lib/helpers');

const url = 'https://tretton37.com/meet';

function buildSQLStatementFromArray(arr) {
  let statement = `INSERT INTO users (name, office, github, twitter, linkedin) VALUES `;
  arr.forEach(({ name, office, github, twitter, linkedin }, i) => {
    statement += `('${name}', '${office}', '${github}', '${twitter}', '${linkedin}')`;

    statement += i === arr.length - 1 ? ';' : ', ';
  });
  return statement;
}

exports.shorthands = undefined;

exports.up = (pgm, run) => {
  rp(url)
    .then(function (html) {
      const $ = cheerio.load(html);
      const scraped = $('.ninja-summary > .contact-info > h1 > a');
      const data = [];

      scraped.each((i, el) => {
        const name = el.children[0].data;
        const office = el.children[1].children[0].data;
        data.push({
          name,
          office: office.substr(5, office.length),
          github: trimText(name),
          linkedin: trimText(name),
          twitter: trimText(name),
        });
      });

      pgm.sql(buildSQLStatementFromArray(data));
      run();
    })
    .catch(function (err) {
      console.error('err', err);
    });
};

exports.down = (pgm) => {};
