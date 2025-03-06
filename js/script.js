const loadAllPost = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/retro-forum/posts');
    const data = await res.json();
    const allPost = data.posts;
    displayAllPost(allPost);
}

const displayAllPost = (allPost) => {
    const allPostContainer = document.getElementById('all-post-container');

    for (const post of allPost) {
        const allPostCard = document.createElement('div');
        allPostCard.classList = `lg:flex bg-gray-100 p-5 rounded-xl hover:bg-purple-100 mb-5`;
        allPostCard.innerHTML = `
                    <div>
                        <img class="w-1/3 rounded-lg" src="${post.image}" alt="">
                        <img class="-mt-18 mx-12 lg:-mt-20 lg:mx-15" src="images/green.png" alt="">
                    </div>
                    <div class="lg:space-y-2 mt-20 lg:mt-0 mr-10">
                        <div class="text-gray-600 text-xs font-normal flex gap-4">
                            <p># ${post.category}</p>
                            <p>Author : <span>${post.author.name}</span></p>
                        </div>
                        <h2 class="text-lg font-semibold">${post.title}</h2>
                        <p class="text-gray-500 text-xs font-normal">${post.description}</p>
                        <hr class="border-dashed text-gray-400 mt-4 mb-4">
                        <div class="lg:flex">
                            <div class="lg:flex gap-14">
                                <div class="flex gap-2 items-center">
                                    <img src="images/comment.png" alt="">
                                    <p class="text-gray-600 font-normal">${post.comment_count}</p>
                                </div>
                                <div class="flex gap-2 items-center">
                                    <img src="images/views.png" alt="">
                                    <p class="text-gray-600 font-normal">${post.view_count}</p>
                                </div>
                                <div class="flex gap-2 items-center">
                                    <img src="images/time.png" alt="">
                                    <p class="text-gray-600 font-normal flex"><span>${post.posted_time}</span> min</p>
                                </div>
                            </div>
                            <div>
                            <button class="read-button" data-id="${post.id}">
                                <img class="lg:ml-64" src="images/read.png" alt="">
                            </button>    
                            </div>
                        </div>
                    </div>
    `;
        allPostContainer.appendChild(allPostCard);
        // const addToRead = document.getElementById('read-button').addEventListener('click',function(){
        //     console.log('clicked')
        // })
        document.querySelectorAll('.read-button').forEach(button => {
            button.addEventListener('click', function () {
                const postId = this.getAttribute('data-id');
                console.log(postId);
                const readBookContainer = document.getElementById('read-book-container');
                const readBookList = document.createElement('div');
                readBookList.classList = `lg:flex md:flex justify-between items-center mt-3 bg-white p-5 rounded-lg`;
                readBookList.innerHTML = `
                    <div class="w-2/3">
                            <h4 class="font-normal text-sm">${post.title}</h4>
                        </div>
                        <div class="flex gap-1 items-center">
                            <img src="images/views.png" alt="">
                            <p class="text-gray-600 text-sm">${post.view_count}</p>
                        </div>
                `;
                readBookContainer.appendChild(readBookList);

                const listedBooks = document.getElementById('listed-books');
                const newListedBook = listedBooks.innerText;
                const selectedBookNumber = parseInt(newListedBook);
                const updatedList = selectedBookNumber + 1;
                listedBooks.innerText = updatedList;
            })
        })
    }
}


loadAllPost();

// --------------------------------Latest Post Section----------------------------------------------

const loadLatestPosts = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/retro-forum/latest-posts');
    const latestPosts = await res.json();
    displayLatestPosts(latestPosts);
}

const displayLatestPosts = (latestPosts) => {
    const latestPostContainer = document.getElementById('latest-post-container');

    for (const latestPost of latestPosts) {
        const latestPostCard = document.createElement('div');
        latestPostCard.classList = `border border-gray-300 rounded-xl p-5 hover:bg-purple-100`;
        latestPostCard.innerHTML = `
            <img class="mx-auto rounded-xl" src="${latestPost.cover_image}" alt="">
                <p class="text-gray-500 text-xs mt-4">${latestPost.author?.posted_date || 'No publish date'}</p>
                <h4 class="font-semibold mt-4">${latestPost.title}</h4>
                <p class="text-gray-500 text-sm mt-4">${latestPost.description}</p>
                <div class="flex items-center gap-5 mt-4">
                    <img src="images/user.png" alt="">
                    <div>
                        <h4 class="font-semibold text-sm">${latestPost.author.name}</h4>
                        <p class="text-gray-500 text-xs">${latestPost.author?.designation || 'Unknown'}</p>
                    </div>
                </div>
        `;
        latestPostContainer.appendChild(latestPostCard);
    }
}

loadLatestPosts();