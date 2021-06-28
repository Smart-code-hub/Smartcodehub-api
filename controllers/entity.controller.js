const BaseController = require("./base.controller");
const Entity = require("../schemas/entity.schema");
const { Types } = require("mongoose");

const { GenerateProject } = require("smart-code-generator-library");

const GetmultipleResourses = async (req, res,next) => {
  try {
    const filePath = await GeneratethesetsFromRequest(req, true);

    return res.send({
      url: filePath
    });
  } catch (error) {
    next(error)
    
  }
};

const GetByUser = async (req, res,next) => {
  try {
    const entity = await Entity.find({ uId: req.uid });

    return res.send(entity);
  } catch (error) {
    next(error)

  }
};
const GetOneById = async (req, res,next) => {
  try {
    const entity = await Entity.findById(req.params.id);

    return res.send(entity);
  } catch (error) {
    next(error)

  }
};
const UpdateById = async (req, res,next) => {
  console.log("filePath");
  try {
    const filePath = await GeneratethesetsFromRequest(req, false);
    console.log(filePath);

    res.send({
      url: filePath
    });
  } catch (error) {
    next(error)

  }
};
const Create = async (req, res,next) => {
  try {
    const filePath = await GeneratethesetsFromRequest(req, false);

    res.send({
      url: filePath
    });
  } catch (error) {
    console.log(error);

    next(error)

  }
};
const GetResoursesByEntity = async (req, res,next) => {
  try {
    const filePath = await GeneratethesetsFromRequest(req, false);

    if (req.body.authEntity) {
      let entity = await Entity.findById(req.body._id);
      entity = await Entity.update(
        {
          _id: req.body._id
        },
        {
          $set: { authEntity: { ...req.body.authEntity } }
        }
      );
    }
    res.send({
      url: filePath
    });
  } catch (error) {
    next(error)

  }
};

const CreateSecureEntitiy = async (req, res,next) => {
  console.log("Going To CreateSecureEntitiy");
  try {
    //const filePath = await GeneratethesetsFromRequest(req, res,next);

    if (req.body.authPayLoads) {
      let entity = await Entity.findById(req.body._id);
      if (entity) {
        console.log("Going To Update");

        entity = await Entity.update(
          {
            _id: req.body._id
          },
          {
            $set: { isAuthEntity: true, authPayLoads: req.body.authPayLoads }
          }
        );
      }
    }
    res.send({
      url: "filePath"
    });
  } catch (error) {
    next(error)

  }
};

async function GeneratethesetsFromRequest(req, processFiles) {
  const resourceUrl = `images/Entities/${req.uid}-${Date.now()}`;
  let entities = [];
  if (req.body.entityList) entities = req.body.entityList;
  else entities.push(req.body);


  if (entities) {
    entities.forEach(element => {
      SaveOrUpdateEntity(element, req.uid);
    });
  }
  if (processFiles) {
    const result = await GenerateProject(
      req.body.metaData,
      req.uid,
      entities,
      processFiles,
      "../" + resourceUrl,
      __dirname
    );
  
    return result.zip.replace("../", "");
  }
  return "Saved and updated";
}

async function SaveOrUpdateEntity(entity, uid) {
  entity.uId = uid;
  console.log(entity._id);

  if (entity._id) {
    console.log("inUpdate");

    await Entity.findOneAndUpdate(
      { _id: entity._id },
      { ...entity },
      { new: true }
    );
  } else {
    entity._id = Types.ObjectId();
    console.log("increate", entity);
    try {
      const res = await Entity.create(entity);
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  }
}
module.exports = {
  ...BaseController(Entity),
  GetmultipleResourses,
  GetByUser,
  GetOneById,
  UpdateById,
  Create,
  GetResoursesByEntity,
  CreateSecureEntitiy,
  GeneratethesetsFromRequest,
  SaveOrUpdateEntity
};
