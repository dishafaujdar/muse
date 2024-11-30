
const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Sarah Gupta",
      role: "Product Designer",
      comment: "This tool has transformed how I approach my projects. Absolutely fantastic!",
      rating: 5,
    },
    {
      name: "Scarelet Johnson",
      role: "Tech Lead",
      comment: "Finally found something that perfectly fits my workflow. Highly recommended!",
      rating: 4,
    },
    {
      name: "Lisa Dutt",
      role: "UX Designer",
      comment: "A game-changer for my design process. Couldn't be happier with the results.",
      rating: 4,
    },
    {
      name: "David Parker",
      role: "Software Engineer",
      comment: "Incredibly intuitive and powerful. Makes complex tasks simple.",
      rating: 5,
    },
    {
      name: "Emma Waston",
      role: "Creative Director",
      comment: "The best solution I've found for my team's needs. Outstanding support too!",
      rating: 4,
   },
    {
      name: "Bruce Lee",
      role: "Project Manager",
      comment: "Exceptional quality and reliability. Worth every penny.",
      rating: 4,
    }
  ];

  return (
    <div className="from-primary h-min mb-7 p-7">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <span className="text-4xl font-bold text-white">
            Reviews Worldwide.
          </span>
          <p className="text-white font-medium mt-4">
            See what our over 6 users are saying about the product.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className=" shadow-2xl rounded-lg p-6 transition-transform hover:scale-105"
            >
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-5 h-5 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              <p className="text-gray-300 mb-6">{testimonial.comment}</p>

              <div className="flex items-center">
                <div>
                  <h3 className="text-white font-semibold">{testimonial.name}</h3>
                  <p className="text-gray-700 text-sm">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestimonialsSection;