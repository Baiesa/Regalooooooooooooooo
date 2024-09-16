
import React from 'react';
import ShoppingCart from './ShoppingCart';
import Orders from './Orders';
import ProductList from './ProductList';


const Home: React.FC = () => {


  return (

    <div>
      <div className="container mx-auto mt-10 text-center">
        <h1 className="text-4xl font-bold mb-4 ">Welcome to the Home Page</h1>
        <div className="">
        <ProductList />
        <ShoppingCart />
        <Orders />
</div>

      </div>
    </div>
  );
};

export default Home;
