const ul = document.getElementById('list')
ul.innerHTML += `<li><a href="#section">Section </a></li>`
ul.innerHTML += `<li><a href="#section1">Section 2 </a></li>`
ul.innerHTML += `<li><a href="#section2">Section 3 </a></li>`
ul.innerHTML += `<li><a href="#section3">Section 4 </a></li>`

const navigation = document.querySelectorAll('header nav a')
const sections = document.querySelectorAll('sections h2')

navigation.forEach(nav => {
  nav.addEventListener('click', smoothScroll)
})

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

function smoothScroll (event) {
  event.preventDefault()
  const href = this.getAttribute('href')
  document.querySelector(href).scrollIntoView({
    behavior: 'smooth'
  })
}
