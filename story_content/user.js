function ExecuteScript(strId)
{
  switch (strId)
  {
      case "6QVRPlInP9y":
        Script1();
        break;
      case "5pxb6LNhLbq":
        Script2();
        break;
      case "6YSggm6bxpz":
        Script3();
        break;
  }
}

function Script1()
{
  class TeamMemberManager {
  constructor(player) {
    this.player = player;
  }

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

  setPlayerVars(prefix, teamMember) {
    this.player.SetVar(`imageUrl_${prefix}`, teamMember.imageUrl);
    this.player.SetVar(`avatarUrl_${prefix}`, teamMember.avatarUrl);
    this.player.SetVar(`fullName_${prefix}`, teamMember.fullName);
    this.player.SetVar(`phoneNumber_${prefix}`, teamMember.phoneNumber);
    this.player.SetVar(`address_${prefix}`, teamMember.address);
  }

  updatePlayerVars() {
    const { teamMemberEN, teamMemberDE, teamMemberZH_CN } = this.getTeamMembers();
    this.setPlayerVars("EN", teamMemberEN);
    this.setPlayerVars("DE", teamMemberDE);
    this.setPlayerVars("ZH_CN", teamMemberZH_CN);
  }
}

const player = GetPlayer();
const teamMemberManager = new TeamMemberManager(player);
teamMemberManager.updatePlayerVars()
}

function Script2()
{
  class ImageAttacher {
  constructor(player) {
    this.player = player;
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
    this.targetElements = {
      img_EN: document.querySelector('[data-model-id="6hnRxwAmon7"]'),
      img_DE: document.querySelector('[data-model-id="5iS388amniz"]'),
      img_CN: document.querySelector('[data-model-id="6IbbpS1M0gj"]'),
      avt_EN: document.querySelector('[data-model-id="67Gkj6xxyoq"]'),
      avt_DE: document.querySelector('[data-model-id="6Uqx7AW2Lfs"]'),
      avt_CN: document.querySelector('[data-model-id="6fVKAxQB7mB"]')
    };
  }

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
const player = GetPlayer();
const imageAttacher = new ImageAttacher(player);
imageAttacher.attachAllImages();
}

function Script3()
{
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
}

