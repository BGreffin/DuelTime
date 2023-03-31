const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const DuelistSchema = new mongoose.Schema({
    firstName: { type: String,
        minLength: [3,"The first name should be at least three characters"],
        required: [true,'There must be a first name']},
    lastName: { type: String,
        minLength: [3,"The last name should be at least three characters"],
        required: [true,'There must be a last name'] },
    userName: { type: String,
        minLength: [5,"The username should be at least five characters"],
        required: [true,'There must be an username'],
        unique: true },
    email: { type: String,
        minLength: [6,"The last name should be at least six characters"],
        required: [true,'There must be an email'],
        validate: {
            validator: val => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
            message: "Please enter a valid email"},
        },
    password: { type: String,
        minLength: [8,"The password should be at least eight characters"],
        required: [true,'There must be a password']},
    },
    {timestamps: true},
);

DuelistSchema.virtual('cpassword')
    .get( () => this._cpassword )
    .set( value => this._cpassword = value );

DuelistSchema.pre('validate', function(next) {
    if (this._password !== this._cpassword) {
        this.invalidate('cpassword', 'Password must match Confirm Password');
    }
    next();
});

DuelistSchema.pre('save', function(next) {
    this.password = bcrypt.hash(this.password, 10)
        .then(hash => {
            this.password = hash;
            next();
        })
});

const Duelist = mongoose.model('Duelist', DuelistSchema);

module.exports = Duelist;