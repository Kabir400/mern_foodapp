# What it do ?

This is just a basic **food delivery app** with **node js and react**, you can login to this site, add to cart food item , search food items and order food.

## Disclaimer!

This is code is inspired from **End to End youtube channel** with some **major modification**

## What Do I Change ?

1. In the original code has **major draw back in authentication** , anyone one in the web can **run script** like `localStorage.setItem("authToken", "random_string") `
   this and he/she can **easily login to your application**.I solve this issue by **checking the token is a valid token or not from the backend** , and sending response to the frontend  and authenticate user form frontend.

2. **Make this code more organized** by dividing the into multiple components and making the state global useing context api.
3. I the original code if you **login to your account from different device you can't see your orders or the items you have stored inside your cart**. But in this case **I stored them in the data base for specific user so you can see your orders and carts even if are login from a different device.**
4. **Ui for cart and order page is completely different from the original** , and there was also some changes like color , button , font-size ,color ...etc in different page.
5. **In backend and frontend both lots of basic changes form the original** like in frontend i made a **custom fetch function** for post request that's how i can avoid writing the headers, methods,body all the time and in backend instead of doing `mongoose.connection.db.collection("food_items")` and saving it in global variable i choose **traditional model, find pattern** , all the **.then() is replaced by async await...lots more.**

## what's need modification ?

- [x] you can implement authorization
- [x] ui is very basic , needs a major modification

- [x] You can implement payment getway , admin pannel to make it real life worth.
