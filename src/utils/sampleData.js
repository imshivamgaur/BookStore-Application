import you1 from "../assets/you_1.jpg"
import you2 from "../assets/you_2.jpg"
import elo1 from "../assets/eloquent.jpg"
import elo2 from "../assets/eloquent_2.jpg"
import edu1 from "../assets/educated_1.jpg"
import edu2 from "../assets/educated_2.jpg"
import html1 from "../assets/html_1.jpg"
import html2 from "../assets/html_2.jpg"
import book1 from "../assets/1984_1.png"
import book2 from "../assets/1984_2.jpg"
import ato1 from "../assets/atomic_1.jpg"
import ato2 from "../assets/atomic_2.jpg"
import bec1 from "../assets/becoming_1.jpg"
import bec2 from "../assets/becoming_2.jpg"

import clean1 from "../assets/clean_1.jpeg"
import clean2 from "../assets/clean_2.jpeg"
import node1 from "../assets/node_1.jpg"
import node2 from "../assets/node_2.jpg"
import rea1 from "../assets/react_1.jpg"
import rea2 from "../assets/react_2.png"

import reaup1 from "../assets/reactup_1.jpeg"
import reaup2 from "../assets/reactup_2.jpg"

import ste1 from "../assets/steve_1.jpg"
import ste2 from "../assets/steve_2.jpg"

import gre1 from "../assets/thegreate_1.jpg"
import gre2 from "../assets/thegreate_2.jpg"

import mar1 from "../assets/themartin_1.jpeg"
import mar2 from "../assets/themartin_2.webp"

export const books = [
 

  {
    id: 1,
    title: "You Don’t Know JS Yet",
    author: "Kyle Simpson",
    price: 19.99,
    originalPrice: 25.00,
    discount: 20,
    rating: 4.7,
    reviews: 2890,
    category: "Tech",
    description: "Deep dive into the core mechanisms of JavaScript.",
    pages: 328,
    inStock: true,
    stockCount: 28,
    deliveryTime: "3-5 days",
    images: [you1,you2],
    isbn: "9781091210091",
    publishedDate: "2020-01-28"
  },
  {
    id: 2,
    title: "The Road to React",
    author: "Robin Wieruch",
    price: 28.99,
    originalPrice: 35.00,
    discount: 17,
    rating: 4.5,
    reviews: 1200,
    category: "Tech",
    description: "A hands-on guide to building React applications.",
    pages: 250,
    inStock: true,
    stockCount: 18,
    deliveryTime: "2-3 days",
    images: [rea1,rea2],
    isbn: "9781720043997",
    publishedDate: "2022-02-11"
  },
  {
    id: 3,
    title: "Node.js Design Patterns",
    author: "Mario Casciaro",
    price: 31.99,
    originalPrice: 45.00,
    discount: 29,
    rating: 4.6,
    reviews: 1700,
    category: "Tech",
    description: "Best practices and design patterns for Node.js.",
    pages: 520,
    inStock: true,
    stockCount: 25,
    deliveryTime: "4-6 days",
    images: [node1,node2],
    isbn: "9781839214110",
    publishedDate: "2020-07-24"
  },
  {
    id: 4,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    price: 9.99,
    originalPrice: 14.99,
    discount: 33,
    rating: 4.4,
    reviews: 15489,
    category: "Fiction",
    description: "A classic American novel about wealth and the American dream.",
    pages: 180,
    inStock: true,
    stockCount: 60,
    deliveryTime: "2-3 days",
    images: [gre1,gre2],
    isbn: "9780743273565",
    publishedDate: "1925-04-10"
  },
  {
    id: 5,
    title: "Becoming",
    author: "Michelle Obama",
    price: 18.99,
    originalPrice: 32.50,
    discount: 41,
    rating: 4.9,
    reviews: 23000,
    category: "Biography",
    description: "Memoir of former First Lady Michelle Obama.",
    pages: 448,
    inStock: true,
    stockCount: 38,
    deliveryTime: "2-3 days",
    images: [bec1,bec2],
    isbn: "9781524763138",
    publishedDate: "2018-11-13"
  },

  {
    id: 6,
    title: "Atomic Habits",
    author: "James Clear",
    price: 16.99,
    originalPrice: 27.00,
    discount: 37,
    rating: 4.9,
    reviews: 40200,
    category: "Biography",
    description: "Tiny changes, remarkable results in building habits.",
    pages: 320,
    inStock: true,
    stockCount: 48,
    deliveryTime: "2-3 days",
    images: [ato1,ato2],
    isbn: "9780735211292",
    publishedDate: "2018-10-16"
  },
  {
    id: 7,
    title: "1984",
    author: "George Orwell",
    price: 8.99,
    originalPrice: 12.99,
    discount: 31,
    rating: 4.7,
    reviews: 21800,
    category: "Fiction",
    description: "A dystopian novel on surveillance and control.",
    pages: 328,
    inStock: true,
    stockCount: 45,
    deliveryTime: "2-4 days",
    images: [book1,book2],
    isbn: "9780451524935",
    publishedDate: "1949-06-08"
  },
    {
      id: 8,
      title: "Clean Code",
      author: "Robert C. Martin",
      price: 29.99,
      originalPrice: 39.99,
      discount: 25,
      rating: 4.8,
      reviews: 12852,
      category: "Tech",
      description: "A handbook of agile software craftsmanship emphasizing writing clean, maintainable code.",
      pages: 464,
      inStock: true,
      stockCount: 40,
      deliveryTime: "2-3 days",
      images: [
        clean1,clean2
      ],
      isbn: "9780132350884",
      publishedDate: "2008-08-01"
    },
    {
      id: 9,
      title: "Steve Jobs",
      author: "Walter Isaacson",
      price: 21.99,
      originalPrice: 29.99,
      discount: 27,
      rating: 4.6,
      reviews: 9811,
      category: "Biography",
      description: "The exclusive biography of Apple co-founder Steve Jobs, based on over forty interviews.",
      pages: 656,
      inStock: true,
      stockCount: 28,
      deliveryTime: "3-5 days",
      images: [
        ste1,ste2
      ],
      isbn: "9781451648539",
      publishedDate: "2011-10-24"
    },

    {
      id: 10,
      title: "Eloquent JavaScript",
      author: "Marijn Haverbeke",
      price: 26.95,
      originalPrice: 34.99,
      discount: 23,
      rating: 4.5,
      reviews: 5897,
      category: "Tech",
      description: "A modern introduction to programming using JavaScript.",
      pages: 472,
      inStock: true,
      stockCount: 35,
      deliveryTime: "2-4 days",
      images: [
        elo1,elo2
      ],
      isbn: "9781593279509",
      publishedDate: "2018-12-04"
    },
   
    {
      id: 11,
      title: "React Up & Running",
      author: "Stoyan Stefanov",
      price: 22.50,
      originalPrice: 32.00,
      discount: 30,
      rating: 4.1,
      reviews: 1352,
      category: "Tech",
      description: "A practical introduction to React for web developers.",
      pages: 250,
      inStock: true,
      stockCount: 25,
      deliveryTime: "2-3 days",
      images: [
        reaup1,reaup2
      ],
      isbn: "9781491931820",
      publishedDate: "2016-05-25"
    },
    {
      id: 12,
      title: "The Martian",
      author: "Andy Weir",
      price: 14.99,
      originalPrice: 18.99,
      discount: 21,
      rating: 4.7,
      reviews: 11224,
      category: "Fiction",
      description: "A thrilling survival story of an astronaut stranded on Mars.",
      pages: 387,
      inStock: true,
      stockCount: 42,
      deliveryTime: "2-3 days",
      images: [
        mar1,mar2
      ],
      isbn: "9780553418026",
      publishedDate: "2014-02-11"
    },
    
    {
      id: 13,
      title: "Educated",
      author: "Tara Westover",
      price: 16.99,
      originalPrice: 26.00,
      discount: 35,
      rating: 4.8,
      reviews: 18456,
      category: "Biography",
      description: "A memoir about growing up in a survivalist family and seeking education.",
      pages: 352,
      inStock: true,
      stockCount: 34,
      deliveryTime: "2-4 days",
      images: [
        edu1,edu2
      ],
      isbn: "9780399590504",
      publishedDate: "2018-02-20"
    },
    {
      id: 14,
      title: "HTML and CSS: Design and Build Websites",
      author: "Jon Duckett",
      price: 22.99,
      originalPrice: 29.99,
      discount: 23,
      rating: 4.5,
      reviews: 4025,
      category: "Tech",
      description: "A beautifully designed and easy-to-follow book for HTML & CSS.",
      pages: 490,
      inStock: true,
      stockCount: 39,
      deliveryTime: "1-3 days",
      images: [
        html1,html2
      ],
      isbn: "9781118008188",
      publishedDate: "2011-11-08"
    }
  
  
  // Add 10 more if needed...
];

export const categories = ["All", "Fiction", "Tech", "Biography"];
export const sortOptions = [
  { value: "title", label: "Title A-Z" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "rating", label: "Rating: High to Low" },
];