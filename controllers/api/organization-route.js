import { Router } from 'express';
import { Organization } from '../../models';

const router = Router();

// GET all organizations
router.get('/', async (req, res) => {
    try {
        const organizations = await Organization.findAll();
        res.json(organizations);
    } catch (err) {
        res.status(500).json({ error: 'Failed to get organizations' });
    }
});

// GET a single organization by id
router.get('/:id', async (req, res) => {
    try {
        const organization = await Organization.findByPk(req.params.id);
        if (!organization) {
            return res.status(404).json({ error: 'Organization not found' });
        }
        res.json(organization);
    } catch (err) {
        res.status(500).json({ error: 'Failed to get organization' });
    }
});

// CREATE a new organization
router.post('/', async (req, res) => {
    try {
        const newOrg = await Organization.create(req.body);
        res.status(201).json(newOrg);
    } catch (err) {
        res.status(400).json({ error: 'Failed to create organization' });
    }
});

// UPDATE an organization by id
router.put('/:id', async (req, res) => {
    try {
        const [updated] = await Organization.update(req.body, {
            where: { id: req.params.id }
        });
        if (!updated) {
            return res.status(404).json({ error: 'Organization not found' });
        }
        const updatedOrg = await Organization.findByPk(req.params.id);
        res.json(updatedOrg);
    } catch (err) {
        res.status(400).json({ error: 'Failed to update organization' });
    }
});

// DELETE an organization by id
router.delete('/:id', async (req, res) => {
    try {
        const deleted = await Organization.destroy({
            where: { id: req.params.id }
        });
        if (!deleted) {
            return res.status(404).json({ error: 'Organization not found' });
        }
        res.json({ message: 'Organization deleted' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete organization' });
    }
});

export default router;