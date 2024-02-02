const express = require('express');
const router = express.Router();
const User = require('../models/userSchema.js')
const Book = require('../models/bookSchema.js')
const Reservation = require('../models/reserveSchema.js')
const Comment = require('../models/commentSchema.js')
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt')
const mongoose = require('mongoose');

const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './client/src/uploads')
    },
    filename: function (req, file, cb) {
      const uniquePreffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, uniquePreffix + '-' + file.originalname)
    }
  })
  
const upload = multer()
  

//Login
//#######################################################################//
//Creating User Account
router.post('/register', asyncHandler(async (req, res) => {
    const hashedPwd = await bcrypt.hash(req.body.password, 10)
    const user = new User({
        "name": req.body.name,
        "surname": req.body.surname,
        "nick": req.body.nick,
        "email": req.body.email,
        "password": hashedPwd
    })
    if (!await getUserByEmail(req.body.email)){
    const newUser = await user.save()
    res.status(201).json(newUser)
    } else {
        res.status(500).json( {message: "User with that email already exists"})
    }
    
}))

//Logging in
router.post('/login', async (req,res) => {
   
    try {
        const users = await User.findOne({ email: req.body.email })
        if(users) {
            bcrypt.compare(req.body.password, users.password, function(err, isMatch) {
                if (isMatch) {
                    res.cookie('user', users.email, {
                        sameSite: 'None'
                      });
                    res.status(201).json( { message: `user ${users.nick} logged in` });
                    
                } else {
                    res.status(500).json({ message: "Incorrect password" });
                }
            });
        }
    } catch (err) {
        res.status(404).json({message: err.message})
    }}
    )

//See current session user
router.get('/profile', (req, res) => {
    new Promise((resolve, reject) => {
        try {
            resolve(`Current user: ${req.cookies.user}`);
        } catch (err) {
            reject({ message: err.message });
        }
    })
    .then(result => {
        res.send(result);
    })
    .catch(err => {
        res.status(500).json({ message: err.message });
    });
});


//Logout
// router.get('/logout',(req,res)=>
// {
// res.clearCookie('user')
// res.json('Thank you! Visit again')
// })
router.get('/logout', (req, res) => {
    new Promise((resolve) => {
        res.clearCookie('user');
        resolve('Thank you! Visit again');
    })
    .then(result => {
        res.json(result);
    })
    .catch(err => {
        res.status(500).json({ message: err.message });
    });
});

//Delete own account
router.delete('/profile', asyncHandler(async (req, res) => {
    const mail = await req.cookies.user
    const users = await User.findOneAndDelete({ email: mail })
    if(users!==undefined){
        res.json(`User ${mail} deleted`)
        res.clearCookie('user');
    } else {
        res.json(`Error`)
    } 
}))

router.delete('/user/delete/:id', asyncHandler(async (req, res) => {
    const users = await User.findOneAndDelete({ _id: req.params.id })
    if(users!==undefined){
        res.json(`User ${req.params.id} deleted`)
        res.clearCookie('user');
    } else {
        res.json(`Error`)
    } 
}))


//Get all users
router.get('/allusers', (req, res) => {
    new Promise((resolve, reject) => {
        User.find()
            .then(users => resolve(users))
            .catch(err => reject({ message: err.message }));
    })
    .then(users => {
        res.json(users);
    })
    .catch(err => {
        res.status(500).json({ message: err.message });
    });
});

//Edit user
router.patch('/admin/user/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        const updatedData = req.body;

        const users = await User.findById(userId);
        if (!users) {
            return res.status(404).json({ message: 'User not found' });
          }
        users.set(updatedData);
        const updatedUser = await users.save();
        res.json(updatedUser)
    } catch (err) {
        res.status(500).json({message: err.message})
    }
})

//Reservation
router.post('/book/reservations/:id', asyncHandler( async (req, res) => {
    const user = req.cookies.user;
    const date = req.body.date;
    const title = await Book.findById({ _id: req.params.id })
    const reservation = new Reservation({
        "bookId": req.params.id,
        "title": title.title,
        "userId": user,
        "reserveDate": date
    })
    const newRes = await reservation.save()
    res.status(201).json(newRes)
  

}))

// router.patch('/admin/book/:id', upload.none(), async (req, res) => {
//     try {
        
//         const bookId = req.params.id;
//         const updatedData = req.body;

//         const books = await Book.findById(bookId);
//         if (!books) {
//             return res.status(404).json({ message: 'Book not found' });
//           }
//         books.set(updatedData);
//         const updatedBook = await books.save();
//         res.json(updatedBook)
//     } catch (err) {
//         res.status(500).json({message: err.message})
//     }
// })

router.patch('/book/reservations/confirm/:id', upload.none(), asyncHandler(async (req, res) => {
    try {
        const reservation = await Reservation.findOne({ _id: req.params.id});

        if (!reservation) {
            return res.status(404).json({ message: 'Reservation not found' });
        }
        reservation.status = 'confirmed';

        const updatedReservation = await reservation.save();

        res.status(200).json(updatedReservation);
    } catch (error) {
        console.error('Error updating reservation:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}));

router.patch('/book/reservations/borrow/:id', upload.none(), asyncHandler(async (req, res) => {
    try {
        const reservation = await Reservation.findOne({ _id: req.params.id});

        if (!reservation) {
            return res.status(404).json({ message: 'Reservation not found' });
        }
        reservation.status = 'borrowed';

        const updatedReservation = await reservation.save();

        res.status(200).json(updatedReservation);
    } catch (error) {
        console.error('Error updating reservation:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}));

router.delete('/book/reservations/delete/:id', upload.none(), asyncHandler(async (req, res) => {
    try {
        const reservation = await Reservation.findOneAndDelete({ _id: req.params.id});

        res.status(200).json(reservation);
    } catch (error) {
        console.error('Error updating reservation:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}));

router.patch('/book/reservations/edit/:id', upload.none(), asyncHandler(async (req, res) => {
    try {
        const reservation = await Reservation.findOne({ _id: req.params.id});

        if (!reservation) {
            return res.status(404).json({ message: 'Reservation not found' });
        }
        reservation.date = '2024-03-02T00:00:00.000Z';

        const updatedReservation = await reservation.save();

        res.status(200).json(updatedReservation);
    } catch (error) {
        console.error('Error updating reservation:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}));

router.patch('/book/reservations/return/:id', upload.none(), asyncHandler(async (req, res) => {
    try {
        const reservation = await Reservation.findOne({ _id: req.params.id});

        if (!reservation) {
            return res.status(404).json({ message: 'Reservation not found' });
        }
        reservation.status = 'returned';

        const updatedReservation = await reservation.save();

        res.status(200).json(updatedReservation);
    } catch (error) {
        console.error('Error updating reservation:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}));

// router.patch('/book/reservations/:id', upload.none(), asyncHandler( async (req, res) => {
//     const title = await Reservation.findById({ bookId: req.params.bookId })
//     const updatedData = req.body;
//     title.set(updatedData);
//     const newRes = await reservation.save()
//     res.status(201).json(newRes)
  

// }))

router.get('/allreservations', (req, res) => {
    new Promise((resolve, reject) => {
        Reservation.find()
            .then(books => resolve(books))
            .catch(err => reject({ message: err.message }));
    })
    .then(books => {
        res.json(books);
    })
    .catch(err => {
        res.status(500).json({ message: err.message });
    });
});



// router.post('/admin/newbook', upload.none(), asyncHandler(async (req, res) => {
//     const book = new Book({
//         "title": req.body.title,
//         "cover": req.body.cover,
//         "author": req.body.author,
//         "description": req.body.description,
//         "genre": req.body.genre.split(','),
//         "date": req.body.date,
//         "publisher": req.body.publisher,
//         "publishingYear": req.body.publishingYear
//     })
//     const newBook = await book.save()
//     res.status(201).json(newBook)
//     res.json(req.cover)

// }))


//Delete reservation
router.delete('/book/reservation/:id', asyncHandler( async (req, res) => {
    const user = req.cookies.user;
    const book = await Book.findById(req.params.id)
    if(book.status==='reserved') {
        await Book.updateOne( { _id: req.params.id }, { $set: { status: 'available' } })
        await User.updateOne( { email: user }, { $addToSet: {history: { id: book._id, title: book.title, status: 'cancelled' } } })
        res.status(201).json(`${book.title} reservation cancelled`)
    } else {
        res.status(500).json( { message: "Incorrect book status"})
    }
}))

// //Confirmation
// router.post('/book/reservation/:id', asyncHandler( async (req, res) => {
//     const user = req.cookies.user;
//     const book = await Book.findById(req.params.id)
//     const checkHistory = await User.find( {email: user, history: {$elemMatch: {id: book._id, title: book.title, status: 'reserved'}}})
//     if(checkHistory!==undefined) {

    
//     await User.updateOne( { email: user, history: {$elemMatch: {id: book._id}} },
//         { 
//         $set: 
//         {
//         history: 
//             { id: book._id, title: book.title, status: 'confirmed' } } })
//     res.status(201).json(`${book.title} reservation confirmed`)
//     } else {
//         res.status(500).json(`Error`)
//     }
// }

// ))

//Borrowing
router.post('/book/borrowing/:id', asyncHandler( async (req, res) => {
    const user = req.cookies.user;
    const book = await Book.findById(req.params.id)
    const checkHistory = await User.find( {email: user, history: {$elemMatch: {id: book._id, title: book.title, status: 'confirmed'}}})
    if(checkHistory!==undefined) {
    await User.updateOne( { email: user, history: {$elemMatch: {id: book._id}} },
        { 
        $set: 
        {
        history: 
            { id: book._id, title: book.title, status: 'borrowed' } } })
    res.status(201).json(`${book.title} borrowed by ${user}`)
    } else {
        res.status(500).json(`Error`)
    }
}))


//returning
router.post('/book/returning/:id', asyncHandler( async (req, res) => {
    const user = req.cookies.user;
    const book = await Book.findById(req.params.id)
    const checkHistory = await User.find( {email: user, history: {$elemMatch: {id: book._id, title: book.title, status: 'confirmed'}}})
    if(checkHistory!==undefined) {
    await User.updateOne( { email: user, history: {$elemMatch: {id: book._id}} },
        { 
        $set: 
        {
        history: 
            { id: book._id, title: book.title, status: 'returned' } } })
    await Book.updateOne( { _id: req.params.id }, { $set: { status: 'available' } })
    res.status(201).json(`${book.title} returned by ${user}`)
    } else {
        res.status(500).json(`Error`)
    }
}

))

//Sorting


//##################################################################
// //Create new Book
router.post('/admin/newbook', upload.none(), asyncHandler(async (req, res) => {
    const book = new Book({
        "title": req.body.title,
        "cover": req.body.cover,
        "author": req.body.author,
        "description": req.body.description,
        "genre": req.body.genre.split(','),
        "date": req.body.date,
        "publisher": req.body.publisher,
        "publishingYear": req.body.publishingYear
    })
    const newBook = await book.save()
    res.status(201).json(newBook)
    res.json(req.cover)

}))

//Delete Book
router.delete('/admin/book/:id', asyncHandler(async (req, res) => {
    const bookId = req.params.id;
    const books = await Book.findOneAndDelete({ _id: bookId })
    if(books!==undefined){
        res.json(`Book ${bookId} deleted`)
    } else {
        res.json(`Error`)
    }
    
}))

//Get all books
router.get('/allbooks', (req, res) => {
    new Promise((resolve, reject) => {
        Book.find()
            .then(books => resolve(books))
            .catch(err => reject({ message: err.message }));
    })
    .then(books => {
        res.json(books);
    })
    .catch(err => {
        res.status(500).json({ message: err.message });
    });
});

//Sort book by
router.get('/allbooks/:sort', async (req, res) => {
    const criterium = req.params.sort
    if(criterium == `date`){
    const books = await Book.find().sort({ date: 1 }) 
    res.json(books);
      } else if (criterium == `date-`){
        const books = await Book.find().sort({ date: -1 }) 
        res.json(books);
       } else if (criterium == `publishingYear`){
            const books = await Book.find().sort({ publishingYear: 1 }) 
            res.json(books);
            } else if (criterium == `publishingYear-`){
                const books = await Book.find().sort({ date: -1 }) 
                    res.json(books);
            }   else {
                    res.status(500).json("error")
                }
});

//Get all books with title
router.get('/allbooks/:title', (req, res) => {
    new Promise((resolve, reject) => {
        const title = JSON.stringify(req.params.title);
        Book.find({ title: title })
            .then(books => resolve(books))
            .catch(err => reject({ message: err.message }));
    })
    .then(books => {
        res.json(books);
    })
    .catch(err => {
        res.status(500).json({ message: err.message });
    });
});

//Edit book
router.patch('/admin/book/:id', upload.none(), async (req, res) => {
    try {
        
        const bookId = req.params.id;
        const updatedData = req.body;

        const books = await Book.findById(bookId);
        if (!books) {
            return res.status(404).json({ message: 'Book not found' });
          }
        books.set(updatedData);
        const updatedBook = await books.save();
        res.json(updatedBook)
    } catch (err) {
        res.status(500).json({message: err.message})
    }
})

router.patch('/admin/book/patch/:id', upload.none(), async (req, res) => {
    try {
        const bookId = req.params.id;
        const updatedTitle = req.body.title;

        const book = await Book.findById(bookId);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        book.title = updatedTitle;
        const updatedBook = await book.save();

        res.json(updatedBook);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
//Book details
router.get('/book/:id', asyncHandler(async (req, res) => {
    const bookId = req.params.id;
    const books = await Book.aggregate([
        { $match: { $expr : { $eq: [ '$_id' , { $toObjectId: bookId } ] } } },
        {
            $addFields: {
            score: '$reviews'
            }
        },
        {
            $unset: 'reviews'
        },
        {
            $project: {
                _id: 0,
                title: 1,
                cover: 1,
                description: 1,
                date: 1,
                genre: 1,
                author: 1,
                publisher: 1,
                publishingYear: 1,
                status: 1,
                score: 1
            }
        }
    
    ])
    res.status(201).json(books)
}))

//COMMENTS
//#####################################################################

//new comment
router.post('/book/comments/:title', asyncHandler(async (req, res) => {
    const title = req.params.title;
    const mail = req.cookies.user;
    let nick;
    if (mail) {
        const users = await User.findOne( {email: mail})
        nick = users.nick
    } else {
        nick = "Anonymous"
    }
    const comment = new Comment({
        "user": nick,
        "content": req.body.content,
        "book": title
    })
    const newComment = await comment.save()
    res.status(201).json(newComment)

}))

//Get all comments for book
router.get('/book/comments/:title', asyncHandler(async (req, res) => {
    const title = req.params.title;
    const comments = await Comment.find({ book: title })
    res.status(201).json(comments)
}))

//edit comment
router.patch('/admin/comments/:id', async (req, res) => {
    try {
        const commentId = req.params.id;
        const updatedData = req.body;

        const comments = await Comment.findById(commentId);
        if (!comments) {
            return res.status(404).json({ message: 'Comment not found' });
          }
        comments.set(updatedData);
        const updatedComment = await comments.save();
        res.json(updatedComment)
    } catch (err) {
        res.status(500).json({message: err.message})
    }
})

//Delete Comment
router.delete('/admin/comment/:id', asyncHandler(async (req, res) => {
    const commentId = req.params.id;
    const comments = await Comment.findOneAndDelete({ _id: commentId })
    if(comments!==undefined){
        res.json(`Comment ${commentId} deleted`)
    } else {
        res.json(`Error`)
    }
    
}))

//Get all comments
router.get('/admin/allcomments', async (req, res) => {
    try {
        const comments = await Comment.find()
        res.json(comments)
    } catch (err) {
        res.status(500).json({message: err.message})
    }
})

//############################################################

//Add Review
router.post('/book/reviews/:id', asyncHandler(async (req, res) => {
    const currentTime = Date.now()
    const users = await User.findOne({ email: req.body.userId });
    if (!users) {
        return res.status(401).json("Please log in to review");
    }
    const books = await Book.findById(req.params.id)
    const lastReview = users.lastReview;
    if((currentTime - lastReview) >= 5000){
        const title = books.title
        const score = req.body.score
        await Book.updateMany( {title: title}, { $push: { reviews: score}})
        await User.updateOne( { email: req.body.userId }, { $set: { lastReview: currentTime }})

        res.status(201).json(`Added score ${lastReview} to book ${title}`)
    } else {
        res.status(500).json(`Too early, please wait`)
    }
    
}))


//Main Page
router.get('/main', asyncHandler(async (req, res) => {
    const top = await Book.aggregate([
        {
            $addFields: {
                score: { $avg: '$reviews' }
            }
        },
        {
            $unset: 'reviews'
        },
        {
            $group: {
            _id: '$title',
            id: { $first: '$_id' },
            title: { $first: '$title' },
            cover: { $first: '$cover' },
            author: { $first: '$author'},
            genre: { $first: '$genre' },
            score: { $first: '$score' }}
        },
        {
            $project: {
                _id: 1,
                id: 1,
                cover: 1,
                author: 1,
                genre: 1,
                score: 1
            }
        },
        {
            $sort: {
                score: -1
            }
        },
        {
            $limit: 6
        }
    
    ])
    res.status(201).json(top)
    
}))

//Wyszukiwarka
router.get('/search/:condition/:term', async (req, res) => {
    const { condition, term } = req.params;
  
    try {
      let books;
  
      // Sprawdź warunek i dostosuj zapytanie
      if (condition === 'title') {
        books = await Book.find({ title: { $regex: new RegExp(term, 'i') } });
      } else if (condition === 'author') {
        books = await Book.find({ author: { $regex: new RegExp(term, 'i') } });
      } else if (condition === 'genre') {
        books = await Book.find({ genre: { $in: [new RegExp(term, 'i')] } });
      } 
      else {
        return res.status(400).json({ message: 'Invalid condition.' });
      }
  
      res.json(books);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
// router.get('/main/search', asyncHandler( async (req, res) => {
//     const conditions = {};
//     const fields = req.body;
//     Object.entries(fields).forEach(([key, value]) => {
//         if(typeof value === 'string'){
//         conditions[key] = JSON.stringify(value);
//     } else {
//         conditions[key] = value
//     }
//     })
//     const results = await Book.aggregate([
//         {
//             $match: conditions
//         },
//         {
//             $project: {
//                 title: 1,
//                 cover: 1,
//                 genre: 1,
//                 publishingYear: 1

//             }
//         },
//         {
//             $sort: {
//                 publishingYear: -1
//             }
//         }
//     ])
//     res.status(201).json(results)
// }))

//Statistics
router.get('/main/authorProlific', asyncHandler( async (req, res) => {
    
    const results = await Book.aggregate([
        {
            $group: {
              _id: '$author',
              books: { $sum: 1 }
            }
          },
          {
            $sort: { books: -1 }
          },
          {
            $limit: 1
          } 
    ])
    res.status(201).json(results)
}))

router.get('/main/authorPopular', asyncHandler( async (req, res) => {
    
    const results = await Book.aggregate([

        {
            $project: {
              author: 1,
              reviews: { $size: '$reviews' }
            }
          },
          {
            $sort: { reviews: -1 }
          },
          {
            $limit: 1
          } 
    ])
    res.status(201).json(results)
}))

//Book best reviewed
router.get('/main/bestBook', asyncHandler(async (req, res) => {
    const top = await Book.aggregate([
        {
            $addFields: {
                score: { $avg: '$reviews' }
            }
        },
        {
            $unset: 'reviews'
        },
        {
            $group: {
            _id: '$title',
            cover: { $first: '$cover' },
            genre: { $first: '$genre' },
            score: { $first: '$score' }}
        },
        {
            $project: {
                _id: 1,
                title: 1,
                cover: 1,
                score: 1
            }
        },
        {
            $sort: {
                score: -1
            }
        },
        {
            $limit: 1
        }
    
    ])
    res.status(201).json(top)
    
}))

//Oldest Book
router.get('/main/oldestBook', asyncHandler( async (req, res) => {
    
    const results = await Book.aggregate([

        {
            $project: {
              _id: 0,
              title: 1,
              cover: 1,
              author: 1,
              date: '$date'
            }
          },
          {
            $sort: { date: -1 }
          },
          {
            $limit: 1
          } 
    ])
    res.status(201).json(results)
}))

//Most popular genre
router.get('/main/genrePopular', asyncHandler(async (req, res) => {
    const results = await Book.aggregate([
        {
            $group: {
                _id: '$genre',
                books: { $sum: 1 },
                covers: { $push: '$cover' },
                titles: { $push: '$title' }
            }
        },
        {
            $sort: { books: -1 }
        },
        {
            $limit: 1
        }
    ]);

    if (results.length > 0) {
        const mostPopularGenre = results[0];
        const response = {
            genre: mostPopularGenre._id,
            books: mostPopularGenre.books,
            covers: mostPopularGenre.covers,
            titles: mostPopularGenre.titles
        };

        res.status(201).json(response);
    } else {
        res.status(404).json({ message: 'No data found' });
    }
}));

const getUsers = () => User.find();
const getUserById = (id) => User.findById(id);
const getUserByEmail = (adress) => User.findOne({ email: adress });
const deleteUserById = (id) => User.findOneAndDelete({ _id: id });



module.exports = router