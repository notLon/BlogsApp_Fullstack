const { response } = require('express');
const Blog = require('../models/blog');

const blog_index = (request, response) => {
  Blog.find().sort({ createdAt: -1 }) //its gonna go from the newest to the oldest
  .then((result) => {
    response.render('blogs/index', { title: 'All Blogs', blogs: result});
  })
  .catch((error) => {
    console.log(error);
  })
};

const blog_details = (request, response) => {
  const id = request.params.id;
  Blog.findById(id).then((result) => {
    console.log(result);
    response.render('blogs/details', { title: 'Blog Details', blog: result});
  }).catch((error) => {
    response.status(404).render('404', {title: 'Blog not found'});
  });
};

const blog_create_get = (request, response) => {
  response.render('blogs/create', { title: 'New Blog' });
};

const blog_create_post = (request, response) => {
  const blog = new Blog(request.body);
  blog.save().then((result) => {
    response.redirect('/blogs');
  }).catch((error) => {
    console.log(error);
  });
};

const blog_delete = (request, response) => {
  const id = request.params.id;
  Blog.findByIdAndDelete(id).then((result) => {
    response.json({ redirect: '/blogs' });
  }).catch((error) => {
    console.log(error);
  });
};

module.exports = {
  blog_index,
  blog_details,
  blog_create_get,
  blog_create_post,
  blog_delete
};