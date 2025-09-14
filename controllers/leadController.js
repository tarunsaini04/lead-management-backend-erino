import Lead from '../models/Lead.js';

const createLead = async (req, res) => {
  const {
    first_name,
    last_name,
    email,
    phone,
    source,
  } = req.body;

  try {
    const lead = new Lead({
      first_name,
      last_name,
      email,
      phone,
      source,
      user: req.user._id, 
    });

    const createdLead = await lead.save();
    res.status(201).json(createdLead);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getLeads = async (req, res) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    let limit = parseInt(req.query.limit, 10) || 20;
    if (limit > 100) limit = 100;
    const skip = (page - 1) * limit;

    const filter = { user: req.user._id };

    if (req.query.status) filter.status = req.query.status;
    if (req.query.source) filter.source = req.query.source;
    if (req.query.company_contains) {
      filter.company = { $regex: req.query.company_contains, $options: 'i' };
    }
    if (req.query.email_contains) {
        filter.email = { $regex: req.query.email_contains, $options: 'i' };
    }

    if (req.query.score_gt) {
        filter.score = { ...filter.score, $gt: parseInt(req.query.score_gt, 10) };
    }
    if (req.query.score_lt) {
        filter.score = { ...filter.score, $lt: parseInt(req.query.score_lt, 10) };
    }
    
    if (req.query.created_at_after) {
        filter.createdAt = { ...filter.createdAt, $gte: new Date(req.query.created_at_after) };
    }
    if (req.query.created_at_before) {
        filter.createdAt = { ...filter.createdAt, $lte: new Date(req.query.created_at_before) };
    }
    
    if (req.query.is_qualified) {
        filter.is_qualified = req.query.is_qualified === 'true';
    }

    const total = await Lead.countDocuments(filter);
    const leads = await Lead.find(filter)
      .limit(limit)
      .skip(skip)
      .sort({ createdAt: -1 });

    res.status(200).json({
      data: leads,
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

const getLeadById = async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id);

    if (lead) {
      if (lead.user.toString() !== req.user._id.toString()) {
        res.status(401); 
        throw new Error('User not authorized to view this lead');
      }
      res.status(200).json(lead);
    } else {
      res.status(404); 
      throw new Error('Lead not found');
    }
  } catch (error) {
    res.status(res.statusCode || 500).json({ message: error.message });
  }
};

const updateLead = async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id);

    if (lead) {
      if (lead.user.toString() !== req.user._id.toString()) {
        res.status(401);
        throw new Error('User not authorized to update this lead');
      }

      lead.first_name = req.body.first_name || lead.first_name;
      lead.last_name = req.body.last_name || lead.last_name;
      lead.email = req.body.email || lead.email;
      lead.phone = req.body.phone || lead.phone;
      lead.company = req.body.company || lead.company;
      lead.city = req.body.city || lead.city;
      lead.state = req.body.state || lead.state;
      lead.source = req.body.source || lead.source;
      lead.status = req.body.status || lead.status;
      lead.score = req.body.score || lead.score;
      lead.lead_value = req.body.lead_value || lead.lead_value;
      lead.is_qualified = req.body.is_qualified || lead.is_qualified;

      const updatedLead = await lead.save();
      res.status(200).json(updatedLead);
    } else {
      res.status(404);
      throw new Error('Lead not found');
    }
  } catch (error) {
    res.status(res.statusCode || 500).json({ message: error.message });
  }
};

const deleteLead = async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id);

    if (lead) {
      if (lead.user.toString() !== req.user._id.toString()) {
        res.status(401);
        throw new Error('User not authorized to delete this lead');
      }

      await Lead.deleteOne({ _id: req.params.id });
      res.status(200).json({ message: 'Lead deleted successfully' });
    } else {
      res.status(404);
      throw new Error('Lead not found');
    }
  } catch (error) {
    res.status(res.statusCode || 500).json({ message: error.message });
  }
};

export { createLead, getLeads, getLeadById, updateLead, deleteLead };