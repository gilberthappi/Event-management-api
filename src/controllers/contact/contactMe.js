
import { CONTACT } from '../../models';
import { transporter } from '../../utils/mailTransport.js';
import { isAdmin } from '../../middleware/isAdmin.js';

export const createContact = async (req, res) => {
  try {
    const newContact = await CONTACT.create(req.body);

    if (!newContact) {
      return res.status(400).json({ message: 'Bad Request - Invalid data' });
    }

    console.log('Recipient Email:', newContact.email);

    // Send a welcome email to the user
    const mailOptions = {
      from: 'gdushimimana6@gmail.com',
      to: newContact.email,
      subject: 'Welcome to HOLIDAY PLANNER App',
      text: 'Thank you for contacting us!',
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Email sending failed:', error);
        return res.status(500).json({ message: 'Failed to send email' });
      } else {
        console.log('Email sent:', info.response);

        // Respond to the client
        res.status(201).json({
          message: 'Message sent successfully',
          contact: newContact,
        });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getContacts = async (req, res) => {
  try {

    let page = parseInt(req.query.page);
    let limit = parseInt(req.query.limit);
    let skipIndex = (page - 1) * limit;
    let results = {};
    let count = await CONTACT.countDocuments();
    if (page === 1) {
      results.previous = null;
      results.next = {
        page: page + 1,
        limit: limit,
      };
    }
    if (skipIndex > 0) {
      results.previous = {
        page: page - 1,
        limit: limit,
      };
      results.next = {
        page: page + 1,
        limit: limit,
      };
    }
    results.totalPages = Math.ceil(count / limit);
    results.totalEntries = count;
    results.currentPage = page;
    results.limit = limit;
    results.data = await CONTACT.find().limit(limit).skip(skipIndex);
    res.status(200).json(results);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getContactById = async (req, res) => {
  try {
    const contactId = req.params.id;
    const contact = await CONTACT.findById(contactId);

    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    res.status(200).json(contact);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const deleteContact = async (req, res) => {
  try {
    const contactId = req.params.id;
    const deletedContact = await CONTACT.findByIdAndDelete(contactId);

    if (!deletedContact) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    res.status(200).json({ message: 'Contact deleted successfully' });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const updateContactAdminResponse = async (req, res) => {
  const contactId = req.params.id;
  const { adminResponse } = req.body;

  // Check if the user making the update is an admin (You'll need to implement admin authentication)
  // if (!isAdmin(req.user)) {
  //     return res.status(403).json({ message: 'Access denied. You are not an admin.' });
  // }

  try {
      const contact = await CONTACT.findByIdAndUpdate(
          contactId,
          { adminResponse },
          { new: true }
      );

      if (!contact) {
          return res.status(404).json({ message: 'Contact not found' });
      }

      res.status(200).json({ message: 'Admin response added successfully', contact });
  } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: 'Internal server error' });
  }
};
