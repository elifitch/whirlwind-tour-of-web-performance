const LOADING_TIME = 4000;

const mainContent = document.querySelectorAll('.main')[0];
const placeholders = document.querySelectorAll('.post--skeleton');
const loader = document.querySelectorAll('.loader')[0];

function standardSpinner() {
  mainContent.style.display = 'none';
  setTimeout(() => {
    mainContent.style.display = 'block';
    loader.style.display = 'none';
  }, LOADING_TIME);
}

function skeletonScreen() {
  setTimeout(() => {
    placeholders.forEach((ph, i) => {
      ph.classList.remove('post--skeleton');
      const avatar = ph.querySelectorAll('[data-post-avatar]')[0];
      const author = ph.querySelectorAll('[data-post-author]')[0];
      const date = ph.querySelectorAll('[data-post-date]')[0];
      const body = ph.querySelectorAll('[data-post-body]')[0];
      const data = postData[i];
      avatar.src = `img/${data.avatar}`;
      author.textContent = data.author;
      date.textContent = data.date;
      body.textContent = data.body;
    })
  }, LOADING_TIME);
}

// standardSpinner();
skeletonScreen();

const postData = [
  {
    avatar: 'goat-1.jpg',
    author: 'Goaty McGoatface',
    date: 'Tues, Aug 17, 2017 @ 2:34 PM',
    body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur ab vero aspernatur mollitia maxime sapiente, provident dolor iste dicta, repudiandae eum repellat earum, minus minima totam placeat velit magnam molestiae?'
  },
  {
    avatar: 'goat-2.jpg',
    author: 'Linda Goatsen',
    date: 'Tues, Aug 17, 2017 @ 2:38 PM',
    body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur ab vero aspernatur mollitia maxime sapiente, provident dolor iste dicta, repudiandae eum repellat earum, minus minima totam placeat velit magnam molestiae?'
  },
  {
    avatar: 'goat-3.jpg',
    author: 'Steve Goatsen',
    date: 'Tues, Aug 17, 2017 @ 2:40 PM',
    body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur ab vero aspernatur mollitia maxime sapiente, provident dolor iste dicta, repudiandae eum repellat earum, minus minima totam placeat velit magnam molestiae?'
  },
  {
    avatar: 'goat-4.jpg',
    author: 'Janet McGoatface-Bray',
    date: 'Tues, Aug 17, 2017 @ 2:47 PM',
    body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur ab vero aspernatur mollitia maxime sapiente, provident dolor iste dicta, repudiandae eum repellat earum, minus minima totam placeat velit magnam molestiae?'
  }
]