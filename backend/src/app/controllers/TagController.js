import Tag from '../models/Tag';

class TagController {
  async index(req, res) {
    const tags = await Tag.findAll();
    return res.json(tags);
  }

  async store(req, res) {
    const tagExists = await Tag.findOne({ where: { name: req.body.name } });

    if (tagExists) {
      return res.status(400).json({ erro: 'Tag already exists.' });
    }

    const { id, name } = await Tag.create(req.body);

    return res.json({
      id,
      name,
    });
  }

  async show(req, res) {
    const tag = await Tag.findByPk(req.params.id);

    if (!tag) {
      return res.status(404).json({ error: 'Tag not found.' });
    }

    return res.json(tag);
  }

  async update(req, res) {
    const { name } = req.body;

    const tag = await Tag.findByPk(req.params.id);

    if (!tag) {
      return res.status(404).json({ error: 'Tag not found.' });
    }

    if (tag.name !== name) {
      const tagExists = await Tag.findOne({ where: { name } });

      if (tagExists) {
        return res.status(400).json({ error: 'Tag already exists.' });
      }
    }

    await tag.update(req.body);

    return res.json(tag);
  }

  async delete(req, res) {
    const tag = await Tag.findByPk(req.params.id);

    if (!tag) {
      return res.status(404).json({ error: 'Plan not found.' });
    }

    await tag.destroy();

    return res.json();
  }
}

export default new TagController();
