const ul = document.getElementById('list')
ul.innerHTML += `<li><a href="#sectionLink1">Item1 </a></li>`
ul.innerHTML += `<li><a href="#sectionLink2">Item2 </a></li>`
ul.innerHTML += `<li><a href="#sectionLink3">Item3 </a></li>`

document.addEventListener('DOMContentLoaded', () => {
  const listOfLinks = document.querySelectorAll("a[href^='#sectionLink")
  const sections = document.querySelectorAll('div')

  listOfLinks.forEach(function (link) {
    sections.forEach(section => {
      link.addEventListener('click', () => {
        listOfLinks.forEach(link => {
          sections.forEach(section => {
            if (
              link.classList.contains('highlighted') &&
              section.classList.contains('visited')
            ) {
              link.classList.remove('highlighted') &&
                section.classList.remove('visited')
            }
          })
        })

        link.classList.add('highlighted')
        section.classList.add('visited')
        let ref = link.href.split('#sectionLink')
        ref = '#section' + ref[1]
        window.scroll({
          behavior: 'smooth',
          left: 0,
          top: document.querySelector(ref).offsetTop
        })
      })
    })
  })
})
