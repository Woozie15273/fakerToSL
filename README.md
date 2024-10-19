## Preview:
Link https://woozie15273.github.io/fakerToSL/

## /fakerJSLauncher/index.html
```js
<script type="module">
//For English-only user -> import { faker} from 'https://esm.sh/@faker-js/faker';
import { fakerEN, fakerDE, fakerZH_CN } from 'https://esm.sh/@faker-js/faker';

// This defines a class called newMember. A class is like a blueprint for creating objects.
class newMember {
  // The constructor function is used to create and initialize an object created from this class.
  constructor(faker) {
    this.imageUrl = faker.image.url();
    this.avatarUrl = faker.image.avatar();
    this.fullName = faker.person.fullName();
    this.phoneNumber = faker.phone.number();
    this.address = `${faker.location.streetAddress()}, ${faker.location.city()}, ${faker.location.state()}`;
  }
}

// Generate new team members in each languague
const teamMemberEN = new newMember(fakerEN);
const teamMemberDE = new newMember(fakerDE);
const teamMemberZH_CN = new newMember(fakerZH_CN);

/*
localStorage: 
This is a feature in web browsers that allows you to store data on the user’s computer. 
The data stays there even after the browser is closed and reopened.

JSON.stringify: 
This function converts a JavaScript object into a JSON string. 
JSON (JavaScript Object Notation) is a format for storing and transporting data.
This is necessary because localStorage can only store strings. 
So, we convert the mock data objects into strings before storing them.
*/

localStorage.setItem('teamMemberEN', JSON.stringify(teamMemberEN));
localStorage.setItem('teamMemberDE', JSON.stringify(teamMemberDE));
localStorage.setItem('teamMemberZH_CN', JSON.stringify(teamMemberZH_CN));

//console.log('English:', teamMemberEN);
//console.log('German:', teamMemberDE);
//console.log('Chinese:', teamMemberZH_CN);

</script>
```

## JS Trigger - info courier
```js
//This defines a class called TeamMemberManager. A class is like a blueprint for creating objects.
class TeamMemberManager {
  //The constructor function creates and initializes an object from this class. 
  //It takes one parameter, player, and assigns it to this.player.
  constructor(player) {
    this.player = player;
  }

  /*
  This method retrieves the team members’ data from local storage.
  localStorage.getItem('key') gets the stored data for the given key.
  JSON.parse converts the stored JSON string back into a JavaScript object.
  localStorage.removeItem('key') deletes the stored data for the given key.
  Finally, it returns an object containing the three team members.
  */  
  getTeamMembers() {
    const teamMemberEN = JSON.parse(localStorage.getItem('teamMemberEN'));
    const teamMemberDE = JSON.parse(localStorage.getItem('teamMemberDE'));
    const teamMemberZH_CN = JSON.parse(localStorage.getItem('teamMemberZH_CN'));

    //console.log('English_SL:', teamMemberEN);
    //console.log('German_SL:', teamMemberDE);
    //console.log('Chinese_SL:', teamMemberZH_CN);

    localStorage.removeItem("teamMemberEN");
    localStorage.removeItem("teamMemberDE");
    localStorage.removeItem("teamMemberZH_CN");

    return { teamMemberEN, teamMemberDE, teamMemberZH_CN };
  }

  /*
  This method sets various properties on the player object using the data from a team member.
  prefix is a string that will be added to the beginning of each property name.
  teamMember is the object containing the team member’s data.
  this.player.SetVar('name', value) sets a variable on the player object.
  */
  setPlayerVars(prefix, teamMember) {
    this.player.SetVar(`imageUrl_${prefix}`, teamMember.imageUrl);
    this.player.SetVar(`avatarUrl_${prefix}`, teamMember.avatarUrl);
    this.player.SetVar(`fullName_${prefix}`, teamMember.fullName);
    this.player.SetVar(`phoneNumber_${prefix}`, teamMember.phoneNumber);
    this.player.SetVar(`address_${prefix}`, teamMember.address);
  }

  /*
  This method updates the player variables with the data from the team members.
  It first calls getTeamMembers to retrieve the data.
  Then it calls setPlayerVars for each team member, using the appropriate prefix.
  */
  updatePlayerVars() {
    const { teamMemberEN, teamMemberDE, teamMemberZH_CN } = this.getTeamMembers();
    this.setPlayerVars("EN", teamMemberEN);
    this.setPlayerVars("DE", teamMemberDE);
    this.setPlayerVars("ZH_CN", teamMemberZH_CN);
  }
}

//A new TeamMemberManager object is created, passing the player object to the constructor.
//updatePlayerVars is called to update the player variables with the team members’ data.
const player = GetPlayer();
const teamMemberManager = new TeamMemberManager(player);
teamMemberManager.updatePlayerVars();
```

## JS Trigger - Convert imgUrl to img
```js
// Define a class called ImageAttacher
class ImageAttacher {
  // The constructor method is called when a new instance of the class is created
  constructor(player) {
    // Store the player object in the instance
    this.player = player;
    // Define URLs for avatars and images in different languages
    this.avatarUrls = {
      EN: player.GetVar("avatarUrl_EN"),
      DE: player.GetVar("avatarUrl_DE"),
      CN: player.GetVar("avatarUrl_ZH_CN")
    };
    this.imageUrls = {
      EN: player.GetVar("imageUrl_EN"),
      DE: player.GetVar("imageUrl_DE"),
      CN: player.GetVar("imageUrl_ZH_CN")
    };
    // Define target elements in the HTML where images will be attached
    this.targetElements = {
      img_EN: document.querySelector('[data-model-id="6hnRxwAmon7"]'),
      img_DE: document.querySelector('[data-model-id="5iS388amniz"]'),
      img_CN: document.querySelector('[data-model-id="6IbbpS1M0gj"]'),
      avt_EN: document.querySelector('[data-model-id="67Gkj6xxyoq"]'),
      avt_DE: document.querySelector('[data-model-id="6Uqx7AW2Lfs"]'),
      avt_CN: document.querySelector('[data-model-id="6fVKAxQB7mB"]')
    };
  }

  // Method to attach an image to a target element
  attachImage(targetElement, imageUrl, isAvatar = false) {
    if (targetElement) {
      // Clear any existing content
      targetElement.innerHTML = '';

      // Set the background image
      targetElement.style.backgroundImage = `url(${imageUrl})`;
      targetElement.style.backgroundSize = "cover"; // Ensure the image covers the entire element
      targetElement.style.backgroundPosition = "center"; // Center the image
      targetElement.style.backgroundRepeat = "no-repeat"; // Prevent the image from repeating

      // Make the element round if it's an avatar
      if (isAvatar) {
        targetElement.style.borderRadius = "50%";
      }
    } else {
      console.error('Target element not found.');
    }
  }

  // Method to attach all images to their respective elements
  attachAllImages() {
    this.attachImage(this.targetElements.img_EN, this.imageUrls.EN);
    this.attachImage(this.targetElements.img_DE, this.imageUrls.DE);
    this.attachImage(this.targetElements.img_CN, this.imageUrls.CN);
    this.attachImage(this.targetElements.avt_EN, this.avatarUrls.EN, true);
    this.attachImage(this.targetElements.avt_DE, this.avatarUrls.DE, true);
    this.attachImage(this.targetElements.avt_CN, this.avatarUrls.CN, true);
  }
}

// Usage
const player = GetPlayer(); // Get the player object
const imageAttacher = new ImageAttacher(player); // Create a new instance of ImageAttacher
imageAttacher.attachAllImages(); // Attach all images
```

JS Trigger - Dice (Need another trigger to jump to this slide itself when clicks dice):
```js
// Select the element with the specified data-model-id
const webObject = document.querySelector('[data-model-id="6lzfSZO5e0z"]');

// Check if the element exists
if (webObject) {
    // Move the element to be before its next sibling
    webObject.parentNode.insertBefore(webObject, webObject.nextSibling);
} else {
    // Log a message if the element is not found
    console.log('Web object not found');
}
```
