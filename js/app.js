// build up for landing page
const ul = document.getElementById('list')
const buttonScroll = document.querySelector('.btn')
const navigation = document.querySelectorAll('header nav a')
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

navigation.forEach(nav => {
  nav.addEventListener('click', smoothScroll)
})
//looping through navigation and adding 'highlighted' class so its possible to see with section we are viewing
navigation.forEach(function (nav) {
  nav.addEventListener('click', () => {
    navigation.forEach(nav => {
      if (nav.classList.contains('highlighted')) {
        nav.classList.remove('highlighted')
      }
    })
    nav.classList.add('highlighted')
  })
})
//All magic happens here: im using all mighty intersection observer API to target element
window.addEventListener('DOMContentLoaded', event => {
  event.preventDefault()
  const observer = new IntersectionObserver(listing => {
    listing.forEach(listSections => {
      //lets target id from listing and with this we can add active class to it, so we can see with section is viewed from navigation with scroll, I also remove 'highlighted' class if its clicked while scrooling
      const id = listSections.target.getAttribute('id')
      navigation.forEach(nav => {
        if (
          listSections.isIntersecting === true &&
          nav.classList.contains('highlighted')
        ) {
          nav.classList.remove('highlighted')
        }
      })
      //if listSections.intersectionRatio is bigger than 0 we are adding active class to parentElement, this makes us to see with section is scroled from navigation, and if not then we are removing this class
      if (listSections.intersectionRatio > 0) {
        document
          .querySelector(`nav li a[href="#${id}"]`)
          .parentElement.classList.add('active')
      } else {
        document
          .querySelector(`nav li a[href="#${id}"]`)
          .parentElement.classList.remove('active')
      }
    })
  })
  document.querySelectorAll('section[id]').forEach(section => {
    observer.observe(section)
  })
})
