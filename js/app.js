// build up for landing page
const ul = document.getElementById('list')
const buttonScroll = document.querySelector('.btn')
const navigation = document.querySelectorAll('header ul a')
const sections = document.querySelectorAll('section h2')
const footer = document.getElementById('footer')
const h3 = document.createElement('h3')
const paragraph = document.body.appendChild(document.createElement('p'))
//attaching li and a element to ul element, so we can build a navigation
ul.innerHTML += `<li><a href="#section0">Section 0</a></li>`
ul.innerHTML += `<li><a href="#section1">Section 1</a></li>`
ul.innerHTML += `<li><a href="#section2">Section 2</a></li>`
ul.innerHTML += `<li><a href="#section3">Section 3</a></li>`
//some text to footer
paragraph.append('Stina Kalnina')
h3.append('Made with love and passion')
footer.append(h3, paragraph)
// if window scrollY is bigger than 400 lets show btn, if not lets hide this button(func.for scroll up)
const btnVisibility = () => {
  if (window.scrollY > 400) {
    buttonScroll.style.visibility = 'visible'
  } else {
    buttonScroll.style.visibility = 'hidden'
  }
}
//adding event Listener to btnVisible func.
document.addEventListener('scroll', () => {
  btnVisibility()
})
//lets make it smooth when scrollTo happen
buttonScroll.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
})
//Funct. for smooth scrolling when clicking from navigation to scroll to section
function smoothScroll (event) {
  event.preventDefault()
  const href = this.getAttribute('href')
  document.querySelector(href).scrollIntoView({
    behavior: 'smooth',
    top: 0
  })
}

navigation.forEach(ul => {
  ul.addEventListener('click', smoothScroll)
})
//looping through navigation and adding 'highlighted' class so its possible to see with section we are viewing
navigation.forEach(function (ul) {
  ul.addEventListener('click', () => {
    navigation.forEach(ul => {
      if (ul.classList.contains('highlighted')) {
        ul.classList.remove('highlighted')
      }
    })
    ul.classList.add('highlighted')
  })
})
//All magic happens here: im using all mighty intersection observer API to target element
window.addEventListener('DOMContentLoaded', event => {
  event.preventDefault()
  const observer = new IntersectionObserver(listing => {
    listing.forEach(listSections => {
      //lets target id from listing and with this we can add active class to it, so we can see with section is viewed from navigation with scroll, I also remove 'highlighted' class if its clicked while scrooling
      const id = listSections.target.getAttribute('id')
      navigation.forEach(ul => {
        if (
          listSections.isIntersecting === true &&
          ul.classList.contains('highlighted')
        ) {
          ul.classList.remove('highlighted')
        }
      })
      //if listSections.intersectionRatio is bigger than 0 we are adding active class to parentElement, this makes us to see with section is scroled from navigation, and if not then we are removing this class
      if (listSections.intersectionRatio > 0) {
        document
          .querySelector(`ul li a[href="#${id}"]`)
          .parentElement.classList.add('active')
      } else {
        document
          .querySelector(`ul li a[href="#${id}"]`)
          .parentElement.classList.remove('active')
      }
    })
  })
  document.querySelectorAll('section[id]').forEach(section => {
    observer.observe(section)
  })
})

//looping through section and while using getBoundingClientRect() targeted section beeing highlighted, if its not correct possiton of section it will take of sectionhighlight class
function sectionPosition () {
  sections.forEach(function (sec) {
    const rect = sec.getBoundingClientRect()
    sections.forEach(sec => {
      if (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom >= 0 &&
        sec.classList.contains('sectionhighlight')
      ) {
        if (rect.top < window.innerHeight && rect.bottom >= 0)
          sec.classList.remove('sectionhighlight')
      }
    })
    sec.classList.add('sectionhighlight')
  })
}
document.addEventListener('scroll', sectionPosition)
