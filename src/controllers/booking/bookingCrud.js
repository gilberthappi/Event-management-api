import { Booking, USER, TOUR } from '../../models';

// Create a new booking
export const createBooking = async (req, res) => {
    try {
        let now = new Date();
        const clock = now.toUTCString();
        
        const newBooking = new Booking({...req.body, Date: clock });
        await newBooking.save();
        res.status(201).json(newBooking);
    } catch (error) {
        console.error('Error creating booking:', error);
        res.status(500).json({ message: 'Failed to create a booking' });
    }
};

// Get all bookings with user and tour details (without using populate)
export const getBookings = async (req, res) => {
    try {
        const bookings = await Booking.find();
        const bookingsWithDetails = await Promise.all(
            bookings.map(async (booking) => {
                const user = await USER.findById(booking.UserID);
                const tour = await TOUR.findById(booking.tourID);
                return {
                    ...booking.toObject(),
                    // booking: booking,
                    user: user,
                    tour: tour,
                };
            })
        );
        res.status(200).json(bookingsWithDetails);
    } catch (error) {
        console.error('Error getting bookings:', error);
        res.status(500).json({ message: 'Failed to retrieve bookings' });
    }
};

// Get a specific booking by ID with user and tour details (without using populate)
export const getBookingById = async (req, res) => {
    const { id } = req.params;

    try {
        const booking = await Booking.findById(id);
        if (!booking) return res.status(404).json({ message: 'Booking not found' });

        const user = await USER.findById(booking.UserID);
        const tour = await TOUR.findById(booking.tourID);

        const bookingWithDetails = {
            ...booking.toObject(),
            // booking: booking,
            user: user,
            tour: tour,
        };

        res.status(200).json(bookingWithDetails);
    } catch (error) {
        console.error('Error getting a booking by ID:', error);
        res.status(500).json({ message: 'Failed to retrieve the booking' });
    }
};

// Update a booking by ID
export const updateBooking = async (req, res) => {
    const { id } = req.params;

    try {
        const updatedBooking = await Booking.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedBooking) return res.status(404).json({ message: 'Booking not found' });
        res.status(200).json(updatedBooking);
    } catch (error) {
        console.error('Error updating a booking by ID:', error);
        res.status(500).json({ message: 'Failed to update the booking' });
    }
};

// Delete a booking by ID
export const deleteBooking = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedBooking = await Booking.findByIdAndRemove(id);
        if (!deletedBooking) return res.status(404).json({ message: 'Booking not found' });
        res.status(200).json({ message: 'Booking deleted successfully' });
    } catch (error) {
        console.error('Error deleting a booking by ID:', error);
        res.status(500).json({ message: 'Failed to delete the booking' });
    }
};


export const getBookingsCount = async (req, res) => {
  const { year } = req.query;

  try {
    const startDate = new Date(year, 0, 1);
    const endDate = new Date(year, 11, 31);

    // Aggregation count within the specified year range
    const bookingsCount = await Booking.aggregate([
      {
        $match: {
          Date: {
            $gte: startDate,
            $lte: endDate,
          },
        },
      },
      {
        $group: {
          _id: { $month: "$Date" },
          count: { $sum: 1 },
        },
      },
    ]);

    // Convert _id values to month names
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const response = months.map((monthName, index) => {
      const matchingMonth = bookingsCount.find(
        (entry) => entry._id === index + 1
      );
      return {
        label: monthName,
        count: matchingMonth ? matchingMonth.count : 0,
      };
    });

    res.status(200).json(response);
  } catch (error) {
    console.error("Error getting a booking by ID:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// #############################################################################

// import { Booking, USER, TOUR } from '../../models';
// import { transporter } from '../../utils/mailTransport.js';

// // Create a new booking
// export const createBooking = async (req, res) => {
//     try {
//         const { userId} = req;

//         const book = req.body;
//         let checkUser = await USER.findById(userId);
//         if(!checkUser){
//             return res.status(409).json({
//                 message: "Please login first"
//             });
//         }
        
//         let checkTour = await TOUR.findById(book.tourID);
//         if(!checkTour){
//             return res.status(409).json ({
//                 message: "Tour not found"
//             });
//         }
//         const newBooking = await Booking.create({
//             ...req.body,
//             userId: userId,
//         });

//         if(!newBooking){
//             return res.status(400).json({
//                 message: "Booking failed"
//             });
//         }
         
//         const mailOptions = {
//             from: 'gdushimimana6@gmail.com',
//             to: checkUser.email,
//             subject: 'Booking Confirmation',
//             text: 'Thank you for booking the tour!',
//         };

//         transporter.sendMail(mailOptions, (error, info) => {
//             if (error) {
//                 console.error('Email sending failed:', error);
//             } else {
//                 console.log('Email sent:', info.response);
//             }
//         });

//         res.status(201).json(newBooking);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

// // Get a booking by ID
// export const getBookingById = async (req, res) => {
//     try {
//         const { userId, userRole } = req;
//         const bookingId = req.params.id;

//         // Check if the user is an admin or if it's their booking
//         const query = userRole === 'admin' ? {} : { userId };

//         const booking = await Booking.findById(bookingId);

//         if (!booking) {
//             return res.status(404).json({
//                 message: "Booking not found",
//             });
//         }

//         res.status(200).json(booking);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

// // Get all bookings (for users, get their bookings only)
// export const getAllBookings = async (req, res) => {
//     try {
//         const { userId, userRole } = req;

//         // If user is an admin, retrieve all bookings; otherwise, retrieve only their own bookings
//         const query = userRole === 'admin' ? {} : { userId };

//         const bookings = await Booking.find(query);

//       return  res.status(200).json(bookings);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

// // Update a booking (for users, update their bookings only)
// export const updateBooking = async (req, res) => {
//     try {
//         const { userId } = req;
//         const bookingId = req.params.id;

//         const updatedBookingData = req.body;

//         const booking = await Booking.findOneAndUpdate(
//             { _id: bookingId, userId },
//             updatedBookingData,
//             { new: true }
//         );

//         if (!booking) {
//             return res.status(404).json({
//                 message: "Booking not found or user does not have permission to update it",
//             });
//         }

//         // Send an email with the updated booking information
//         const mailOptions = {
//             from: 'gdushimimana6@gmail.com',
//             to: booking.email, // Assuming email is a field in the Booking model
//             subject: 'Booking Update',
//             text: 'Your booking has been updated!',
//         };

//         transporter.sendMail(mailOptions, (error, info) => {
//             if (error) {
//                 console.error('Email sending failed:', error);
//             } else {
//                 console.log('Email sent:', info.response);
//             }
//         });

//         res.status(200).json(booking);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

// // Delete a booking (for users, delete their bookings only)
// export const deleteBooking = async (req, res) => {
//     try {
//         const { userId } = req;
//         const bookingId = req.params.id;

//         const deletedBooking = await Booking.findOneAndDelete({ _id: bookingId, userId });

//         if (!deletedBooking) {
//             return res.status(404).json({
//                 message: "Booking not found or user does not have permission to delete it",
//             });
//         }

//         // Send an email with the deleted booking information
//         const mailOptions = {
//             from: 'gdushimimana6@gmail.com',
//             to: deletedBooking.email, // Assuming email is a field in the Booking model
//             subject: 'Booking Deletion',
//             text: 'Your booking has been deleted!',
//         };

//         transporter.sendMail(mailOptions, (error, info) => {
//             if (error) {
//                 console.error('Email sending failed:', error);
//             } else {
//                 console.log('Email sent:', info.response);
//             }
//         });

//         res.status(200).json(deletedBooking);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

// // Admin-only routes
// // Get all bookings (for admin)
// export const getAllBookingsAdmin = async (req, res) => {
//     try {
//         const bookings = await Booking.find({});

//         res.status(200).json(bookings);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

// // Delete a booking by ID (for admin)
// export const deleteBookingByIdAdmin = async (req, res) => {
//     try {
//         const bookingId = req.params.id;

//         const deletedBooking = await Booking.findByIdAndDelete(bookingId);

//         if (!deletedBooking) {
//             return res.status(404).json({
//                 message: "Booking not found",
//             });
//         }

//         // Send an email with the deleted booking information
//         const mailOptions = {
//             from: 'gdushimimana6@gmail.com',
//             to: deletedBooking.email, // Assuming email is a field in the Booking model
//             subject: 'Booking Deletion',
//             text: 'The booking has been deleted!',
//         };

//         transporter.sendMail(mailOptions, (error, info) => {
//             if (error) {
//                 console.error('Email sending failed:', error);
//             } else {
//                 console.log('Email sent:', info.response);
//             }
//         });

//         res.status(200).json(deletedBooking);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };
