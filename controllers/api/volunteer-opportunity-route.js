import { Router } from 'express';
import { VolunteerOpportunity } from '../../models';

const router = Router();

// GET all volunteer opportunities
router.get('/', async (req, res) => {
    try {
        const opportunities = await VolunteerOpportunity.findAll();
        res.json(opportunities);
    } catch (err) {
        res.status(500).json({ error: 'Failed to get opportunities' });
    }
});

// GET a single volunteer opportunity by id
router.get('/:id', async (req, res) => {
    try {
        const opportunity = await VolunteerOpportunity.findByPk(req.params.id);
        if (!opportunity) {
            return res.status(404).json({ error: 'Opportunity not found' });
        }
        res.json(opportunity);
    } catch (err) {
        res.status(500).json({ error: 'Failed to get opportunity' });
    }
});

// CREATE a new volunteer opportunity
router.post('/', async (req, res) => {
    try {
        const newOpportunity = await VolunteerOpportunity.create(req.body);
        res.status(201).json(newOpportunity);
    } catch (err) {
        res.status(400).json({ error: 'Failed to create opportunity' });
    }
});

// UPDATE a volunteer opportunity
router.put('/:id', async (req, res) => {
    try {
        const [updated] = await VolunteerOpportunity.update(req.body, {
            where: { id: req.params.id }
        });
        if (!updated) {
            return res.status(404).json({ error: 'Opportunity not found' });
        }
        const updatedOpportunity = await VolunteerOpportunity.findByPk(req.params.id);
        res.json(updatedOpportunity);
    } catch (err) {
        res.status(400).json({ error: 'Failed to update opportunity' });
    }
});

// DELETE a volunteer opportunity
router.delete('/:id', async (req, res) => {
    try {
        const deleted = await VolunteerOpportunity.destroy({
            where: { id: req.params.id }
        });
        if (!deleted) {
            return res.status(404).json({ error: 'Opportunity not found' });
        }
        res.json({ message: 'Opportunity deleted' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete opportunity' });
    }
});

export default router;