const GetAll = model => async (req, res) => {
  try {
    return res.send(await model.find());
  } catch (error) {
    return res.status(400).send(error.message);
  }
};
const GetOneById = model => async (req, res) => {
  try {
    return res.send(await model.findById(req.params.id));
  } catch (error) {
    return res.status(400).send(error.message);
  }
};
const UpdateById = model => async (req, res) => {
  try {
    return res.send(
      await model.findOneAndUpdate(
        { _id: req.params.id },
        { ...req.body },
        { new: true }
      )
    );
  } catch (error) {
    return res.status(400).send(error.message);
  }
};
const Delete = model => async (req, res) => {
  console.log();

  try {
    return res.send(await model.remove({ _id: req.params.id }));
  } catch (error) {
    return res.status(400).send(error.message);
  }
};
const DeleteAll = model => async (req, res) => {
  try {
    return res.send(
      await model.remove({
        _id: {
          $in: req.body.ids
        }
      })
    );
  } catch (error) {
    return res.status(400).send(error.message);
  }
};
const Create = model => async (req, res) => {
  try {
    const m = await model.create({ ...req.body });

    return res.send(m);
  } catch (error) {
    return res.status(400).send(error.message);
  }
};
const BaseController = model => {
  return {
    GetAll: GetAll(model),
    GetOneById: GetOneById(model),
    UpdateById: UpdateById(model),
    Delete: Delete(model),
    Create: Create(model),
    DeleteAll: DeleteAll(model)
  };
};

module.exports = BaseController;
