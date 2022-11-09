# Bubble World
[![License: MPL 2.0](https://img.shields.io/badge/License-MPL_2.0-brightgreen.svg)](https://opensource.org/licenses/MPL-2.0)
## Links

<iframe width="1280" height="720" src="https://www.youtube.com/embed/5A9lBIHdNGY" title="Bubble World Demo" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Screenshot
![Insomnia Pic](./images/Screenshot%202022-11-09%20at%2010.03.05%20AM.png)    
## Table of Contents:
#### [Description](#description)
#### [Technology](#technology)
#### [Installation](#installation)
#### [Usage Info](#usage-info)
#### [Contribution Guidelines](#contribution-guidelines)
#### [Test Instructions](#test-instructions)
#### [Questions](#questions)
#### [License Info](#license-info)

## Description
An Experiment in understanding and developing a social media app. Bubble World is a backend application that utilizes MongoDB, Mongoose, and Express to explore the possiblities of social media.

## Technology
The tech dependencies used in this application are MongoDB, Express 4.17, & Mongoose 6.0.
    
## Installation
To install, clone this repo to your local device. From the integrated terminal in VS Code, run an `npm install` to download the packages. Then run `npm start` to get the localhost running on port 3001. You can test the routes in Insomnia.

## Usage Info
the JSON body you need to post a new user is:
`{ "username": "user", "email": "user@gmail.com" }`

To post a new thought: 
`{ "thoughtText": "I want to play some guitar... and bass.", "username": "marshall", "userId": "636aa856387a53c6907d5ade" }`

To post a reaction:
`{ "reactionBody": "I agree!", "username": "Mia" }`

## Contribution Guidelines
If you would like to contribute, let me know via email! You can create a fork of this project and send it my way if you have ideas.

## Test Instructions
Not at this time.

## Questions
If you have questions about this project or any of my other work, please contact me at reed.meher@gmail.com. Check out more of my work on Github at [Archonology](https://github.com/Archonology).
    
## License Info
This project is covered under **Mozilla Public License 2.0**. 
<br>
*MPL is a copyleft license that is easy to comply with. You must make the source code for any of your changes available under MPL, but you can combine the MPL software with proprietary code, as long as you keep the MPL code in separate files. Version 2.0 is, by default, compatible with LGPL and GPL version 2 or greater. You can distribute binaries under a proprietary license, as long as you make the source available under MPL.* 
<br>
To learn more, click the badge: [![License: MPL 2.0](https://img.shields.io/badge/License-MPL_2.0-brightgreen.svg)](https://opensource.org/licenses/MPL-2.0)