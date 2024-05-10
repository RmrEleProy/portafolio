// FILTERS TABS

const tabs = document.querySelectorAll('[data-target]'),
     tabscontents = document.querySelectorAll('[data-content]')

tabs.forEach(tab => {
    tab.addEventListener('click',()=>{
        const target =document.querySelector(tab.dataset.target)

        tabscontents.forEach(tc=>{//*tc = tabcontents 
            tc.classList.remove('filters__active')
            tc.classList.add('filters__desactivated')
        })

        target.classList.add('filters__active')
        target.classList.remove('filters__desactivated')

        tabs.forEach(t =>{//*t = tab
            t.classList.remove('filter-tab-active')
        })
        
        tab.classList.add('filter-tab-active')
    })
})


// DARK LIGHT THEME
const themeButton = document.getElementById('theme-button')
const darkTheme = 'dark-theme'
const iconTheme = 'ri-sun-fill'

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light'
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'ri-moon-fill' : 'ri-sun-fill'

// We validate if the user previously chose a topic
if (selectedTheme) {
  // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
  document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme)
  themeButton.classList[selectedIcon === 'ri-moon-fill' ? 'add' : 'remove'](iconTheme)
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener('click', () => {
    // Add or remove the dark / icon theme
    document.body.classList.toggle(darkTheme)
    themeButton.classList.toggle(iconTheme)
    // We save the theme and the current icon that the user chose
    localStorage.setItem('selected-theme', getCurrentTheme())
    localStorage.setItem('selected-icon', getCurrentIcon())
})