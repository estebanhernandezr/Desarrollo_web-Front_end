//const fetch = require("node-fetch");
import fetch from "node-fetch";
//const cheerio = require("cheerio");
import cheerio from "cheerio";

// function to get the raw data from URL
const get_raw_data = (URL) => {
    return fetch(URL)
        .then((response) => response.text())
        .then((data) => {
        return data;
    });
};

// function to get the parsed data from URL
const get_data = async (URL) => {
    const raw_data = await get_raw_data(URL);

    // parsing the data
    const parsed_data = cheerio.load(raw_data);

    // extracting the wanted element
    const loaded_cheerio = parsed_data('.clamp-list');
    const table = loaded_cheerio['0'];
    const table_children = table['children'];

    table_children.forEach((table_child) => {
        if (table_child['name'] == 'tbody') {
            const tbody_children = table_child['children'];
            tbody_children.forEach((tbody_child) => {
                if (tbody_child['name'] == 'tr' && tbody_child['attribs']['class'] != 'spacer') {
                    const tr_children = tbody_child['children'];
                    tr_children.forEach((tr_child) => {
                        if (tr_child['name'] == 'td' && (tr_child['attribs']['class'] == 'clamp-summary-wrap')) {
                            const td_children = tr_child['children'];
                            td_children.forEach((td_child) => {
                                if (td_child['name'] == 'a') {
                                    const a_children = td_child['children'];
                                    a_children.forEach((a_child) => {
                                        if (a_child['name'] == 'h3') {
                                            console.log(a_child);
                                        }
                                    });
                                } else if (td_child['name'] == 'div' && td_child['attribs']['class'] == 'clamp-details') {
                                    const clamp_details_children = td_child['children'];
                                    clamp_details_children.forEach((clamp_details_child) => {
                                        if (clamp_details_child['name'] == 'span') {
                                            console.log(clamp_details_child);
                                        }
                                    });
                                } else if (td_child['name'] == 'div' && td_child['attribs']['class'] == 'summary') {
                                    const summary_children = td_child['children'];
                                    summary_children.forEach((summary_child) => {
                                        if (summary_child['type'] == 'text') {
                                            console.log(summary_child);
                                        }
                                    });
                                }
                            });
                        }
                    });
                }
            });
        }
    });
};

// URL for data
const URL = 'https://www.metacritic.com/browse/movies/release-date/theaters/date';
// invoking the main function
get_data(URL);
