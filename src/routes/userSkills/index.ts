// src/routes/user-skills/index.ts
import { Router } from 'express';
import {
  createUserSkill,
  deleteUserSkill,
  getUserSkill,
  listUserSkills,
  updateUserSkill,
} from './userSkillsController';
import { validateData } from '../../middlewares/validationMiddleware';
import {
  insertUserSkillSchema,
  updateUserSkillSchema,
} from '../../db/userSkillsSchema';

const router = Router();

router.post('/', validateData(insertUserSkillSchema), createUserSkill);
router.get('/', listUserSkills);
router.get('/:id', getUserSkill);
router.put('/:id', validateData(updateUserSkillSchema), updateUserSkill);
router.delete('/:id', deleteUserSkill);

export default router;
