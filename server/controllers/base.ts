abstract class BaseCtrl {
  abstract model: any;

  // Get all
  getAll = async (req, res) => {
    try {
      const docs = this.model;
      res.status(200).json(docs);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  };

  // Count all
  count = async (req, res) => {
    try {
      const count = await this.model.length;
      res.status(200).json(count);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  };

  // Insert
  insert = async (req, res) => {
    try {
      const obj = this.model.push({ id: `${this.model.length}`, ...req.body });
      res.status(201).json(obj);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  };

  // Get by id
  get = async (req, res) => {
    try {
      const obj = this.model.find((x) => x.id === req.params.id);
      console.log(this.model, req.params.id, obj);
      res.status(200).json(obj);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  };

  // Update by id
  update = async (req, res) => {
    try {
      const index = this.model.findIndex((x) => x.id === req.params.id);
      this.model[index] = req.body;
      res.sendStatus(200);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  };

  // Delete by id
  delete = async (req, res) => {
    try {
      const index = this.model.findIndex((x) => x.id === req.params.id);
      this.model.splice(index, 1);
      res.sendStatus(200);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  };
}

export default BaseCtrl;
