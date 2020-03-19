import Tag from '../models/Tag';
import Tool from '../models/Tool';
import TagsTools from '../models/TagsTools';

class TagController {
  async index(req, res) {
    const toolsTg = await Tool.findAll({
      attributes: ['id', 'title', 'link', 'description'],
      include: [Tag.findAll()],
    });

    return res.json(toolsTg);
  }

  async store(req, res) {
    const { tags } = req.body;

    const tagsDb = await Promise.all(
      tags.map(async name => {
        try {
          return await Tag.findOrCreate({
            where: {
              name,
            },
          }).spread(result => {
            return result;
          });
        } catch (err) {
          return err.toString();
        }
      })
    );

    const { id, title, link, description } = await Tool.create(req.body);

    const tagsForTool = tagsDb.map(data => {
      const tagTool = {
        id_tool: id,
        id_tag: data.id,
      };
      return tagTool;
    });

    await TagsTools.bulkCreate(tagsForTool);

    return res.json({
      id,
      title,
      link,
      description,
      tags,
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
