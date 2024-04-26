import { Booking, USER, EVENT } from '../../models';

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

// Get all bookings with user and event details (without using populate)
export const getBookings = async (req, res) => {
    try {
        const bookings = await Booking.find();
        const bookingsWithDetails = await Promise.all(
            bookings.map(async (booking) => {
                const user = await USER.findById(booking.UserID);
                const event = await EVENT.findById(booking.eventID);
                return {
                    ...booking.toObject(),
                    // booking: booking,
                    user: user,
                    event: event,
                };
            })
        );
        res.status(200).json(bookingsWithDetails);
    } catch (error) {
        console.error('Error getting bookings:', error);
        res.status(500).json({ message: 'Failed to retrieve bookings' });
    }
};

// Get a specific booking by ID with user and event details (without using populate)
export const getBookingById = async (req, res) => {
    const { id } = req.params;

    try {
        const booking = await Booking.findById(id);
        if (!booking) return res.status(404).json({ message: 'Booking not found' });

        const user = await USER.findById(booking.UserID);
        const event = await EVENT.findById(booking.eventID);

        const bookingWithDetails = {
            ...booking.toObject(),
            // booking: booking,
            user: user,
            event: event,
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
