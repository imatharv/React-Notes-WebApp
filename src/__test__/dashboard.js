// import Enzyme, { shallow, mount } from "enzyme";
// import { render, fireEvent } from '@testing-library/react'
// import Adapter from "enzyme-adapter-react-16";
// //import { BrowserRouter as Router } from 'react-router-dom';
// import Dashboard from "../pages/dashboard/dashboard";
// import Navbar from "../components/navbar/navbar";
// Enzyme.configure({ adapter: new Adapter() })

// describe("Testing dashboard component using enzyme..", () => {
//   it("Is search box is getting rendered in header", () => {
//     const wrapper = shallow(<Dashboard />);
//     expect(wrapper.find(".content-wrapper").exists()).toBe(false);
//   });
// });

// describe("Testing navbar component using react testing library..", () => {
//   window.matchMedia = window.matchMedia || function() {
//     return {
//         matches: false,
//         addListener: function() {},
//         removeListener: function() {}
//     };
//   };

//   it("After clicking avatar, a popper menu should get displayed", () => {
//     render(
//       <Navbar />
//     ); 
//     let accountInfoMenuToggle = document.querySelector(".account-info-menu-toggle");
//     fireEvent.click(accountInfoMenuToggle);
//     expect(document.querySelector(".papper")).toBeInTheDocument();
//   })
// });

// //   it("After clicking signin(initially), signup form should not get load", () => {
// //     render(
// //       <Access />
// //     ); 
// //     let signinButton = document.querySelector(".signin-button");
// //     fireEvent.click(signinButton);
// //     expect(document.querySelector(".signup")).not.toBeInTheDocument();
// //   })

// //   it("After clicking signup, signup form should gets load", () => {
// //     render(
// //       <Access />
// //     ); 
// //     let signupButton = document.querySelector(".signup-button");
// //     fireEvent.click(signupButton);
// //     expect(document.querySelector(".signup")).toBeInTheDocument();
// //   })

// //   it("After clicking signup, signin form should gets load (as initial tab))", () => {
// //     render(
// //       <Access />
// //     ); 
// //     let signupButton = document.querySelector(".signup-button");
// //     fireEvent.click(signupButton);
// //     expect(document.querySelector(".signin")).toBeInTheDocument();
// //   })









//   // Testing using mock functions
//   // it('Should call a on click function', () => {
//   //   const mock = jest.spyOn(Dashboard, 'onDummyButtonClick');
//   //   mock.mockImplementation(() => {});
//   //   const component = shallow(<Dashboard />);
//   //   component.find('.onDummyButtonClick').simulate('click');
//   //   expect(mock).toHaveBeenCalled();
//   //   mock.mockRestore();
//   // });

//   // it('Test remove button', () => {
//   //   const mockFunction = jest.fn()
//   //   const test = shallow(<Dashboard onDummyButtonClick={mockFunction} />)
//   //   test.find('Button').simulate('click')
//   //   expect(mockFunction).toHaveBeenCalled()
//   // });











//   // it("Is products are getting rendered", () => {
//   //   const wrapper = shallow(<ProductCard data={{length: 2}} 
//   //     bookData={[{ author: "Steve Jobs",
//   //                 "bookImage": null,
//   //                 "bookName": "Apple",
//   //                 "description": "Story about apple products",
//   //                 "discountPrice": 0,
//   //                 "price": 2000,
//   //                 "updatedAt": "2021-05-22T06:54:44.976Z",
//   //                 "_id": "60a8aab496edee0015d919dc"}]} 
//   //                 />);
//   //   expect(wrapper.find(".product-list").exists()).toBe(true);
//   // });

//   // it("Is add to wishlist redirects", () => {
//   //   const component = shallow(
//   //     <Router>
//   //       <BookDetails />
//   //     </Router>
//   //   );
//   //   const addToWishlist = component.find("#wishlist-btn");
//   //   console.log(addToWishlist);
//   //   addToWishlist.simulate("click");
//   //   component.update();
//   //     expect(component.preventDefault).toBeCalled();
//   //   // expect(component.find(".wishlist-layout-content").exists()).toBe(true);
//   // });

//   // it("Is search input updating the state", () => {
//   //       const component = shallow(
//   //         <Dashboard />
//   //       );
//   //       const search =  component.find(".search");
//   //       const event =  {target  : {value :"Apple"}};
//   //       search.simulate("change",event);
//   //       component.update();
//   //       expect(component.state("searchTerm")).toBe("Apple");
//   //   })