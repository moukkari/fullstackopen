const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const reducer = (sum, item) => {
        return sum + item.likes
    }
    return blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
    let favorite = { likes: -1 }
    blogs.forEach(blog => {
        if(blog.likes > favorite.likes) {
            favorite = blog
        }
    })
    return favorite
}

const mostBlogs = (blogs) => {
    let result = { author: '', blogs: 0 }
    let tmpArr = []
    blogs.forEach(blog => {
        if(tmpArr.some(item => item.author === blog.author)) {
            let tmpBlog = tmpArr.find(item => item.author === blog.author)
            tmpBlog.blogs++
        } else {
            tmpArr.push({ author: blog.author, blogs: 1 })
        }
    })
    tmpArr.forEach(item => {
        if(item.blogs > result.blogs) {
            result = item
        }
    })
    return result
}

const mostLikes = (blogs) => {
    let result = { author: '', likes: 0 }
    let tmpArr = []
    blogs.forEach(blog => {
        if(tmpArr.some(item => item.author === blog.author)) {
            let tmpBlog = tmpArr.find(item => item.author === blog.author)
            tmpBlog.likes += blog.likes
        } else {
            tmpArr.push({ author: blog.author, likes: blog.likes })
        }
    })
    tmpArr.forEach(item => {
        if(item.likes > result.likes) {
            result = item
        }
    })
    return result
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}