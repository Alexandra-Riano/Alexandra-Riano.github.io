// Extra flashcards per lesson, drawn only from that lesson's own text. Each entry is [front, back].
// The lesson's original card (field 9 in app.js) stays first and keeps its saved progress.
const C={
'job-families':[
['Can one job profile belong to more than one job family?','Yes. A profile may belong to one or more families.'],
['What groups job families into a broader layer?','A job family group.'],
['Name three things job families can support.','Prompt filters, reports, Recruiting categories, condition rules, eligibility rules (any three).']],
'job-profiles':[
['When is job code not required on a job profile?','When job-code generation is configured.'],
['Name four optional job-profile fields.','Title, management level, classifications, pay rate type, compensation grade, qualifications, country restriction, description (any four).'],
['Job profile vs job or position?','Profile is the reusable definition; job or position is the staffable instance in an organization.']],
'job-management':[
['Is an open position required to hire under Job Management?','No.'],
['When does a job end under Job Management?','When the worker leaves.'],
['What reporting does Job Management support?','Current headcount only.'],
['Changing a parent org’s staffing model changes existing subordinates?','No. Use Edit Staffing Model on each subordinate.']],
'position-management':[
['Which actions need an open, approved position?','Hire, promote, demote, or transfer.'],
['When does a position close?','When it is filled or manually closed.'],
['Which organizations can you assign to an unfilled position?','Company, cost center, and region.'],
['When does Edit Staffing Model stop being available?','Once positions exist (Position Management) or hiring restrictions are set (Job Management).']],
'staffing-processes':[
['Which Hire subprocess sets pay?','Propose Compensation Hire.'],
['Which Hire subprocess gives system access?','Create Workday Account.'],
['When does the Background Check subprocess apply?','Only for hires not sourced from Recruiting.'],
['Which process handles a material job, position, or manager change?','Change Job.']],
'organization-types':[
['How many primary supervisory organizations can a worker have?','One.'],
['Name four organization types besides supervisory.','Company, cost center, region, pay group, location, custom (any four).'],
['What staffing model does a new subordinate start with?','Its parent’s staffing model.']],
'organization-hierarchies':[
['What do hierarchies aggregate, and why?','Compatible organizations, for reporting rollups (and role, process, or access inheritance).'],
['What preserves effective-dated history of structural changes?','Reorganization events.'],
['Does a cost-center hierarchy change the management chain?','No. It rolls up cost centers for reporting only.']],
'organization-assignments':[
['Should a default value normally also be allowed?','Yes.'],
['What can worker organization assignments populate downstream?','Worktags on downstream transactions.'],
['Where do you see that a subordinate inherits assignments?','The Inherited from Superior check box on the Organization Assignments tab.'],
['How do you override an inherited assignment?','Enter a value on the subordinate organization.']],
'assignable-roles':[
['Name three things assignable roles can drive.','Role-based security membership, business-process routing, reporting responsibility.'],
['Does a role grant access by itself?','No. Group membership plus policy permission produces access.'],
['Can role assignments inherit to subordinate orgs?','Yes, assignments may inherit to subordinates.']],
'bp-framework':[
['What is a business process type?','The event category (for example, Hire).'],
['What does a BP definition specify?','Steps, order, responsible security groups, conditions, notifications, and completion.'],
['Two hires, same definition: how many events?','Two. Each hire is its own event.']],
'bp-definitions':[
['Order Workday checks for a BP definition?','Initiating org’s definition, then its superior orgs, then the default.'],
['When use an organization-specific definition?','When an org’s steps differ greatly from the default.'],
['What must come before the completion step?','All approvals and reviews (later To Dos may remain).'],
['What controls whether an individual step runs?','Condition rules on that step.']],
'bp-steps':[
['Which step type starts the event?','Initiation.'],
['Which step type performs Workday work or a subprocess?','Action.'],
['What does completing a To Do prove?','The click, not necessarily that the outside work happened.']],
'conditions':[
['Which condition can block progress, and on which steps?','Validation, on Initiation or Action steps.'],
['What does a While Running condition decide?','Whether the next approval-chain member acts.'],
['What does an Exit condition decide?','Whether a supported approval-chain or integration step can complete.'],
['Does an Entry condition apply to the Initiation step?','No. Entry decides whether a non-initiation step begins.']],
'notifications':[
['What can trigger a BP notification?','Process status, or step entry or exit.'],
['Name four things you configure on a notification.','Effective date, recipients, trigger, conditions, delivery, content (any four).'],
['Can a notification replace an Approval step?','No. It informs; it does not require or automate work.']],
'standard-reports':[
['Name four report types.','Simple, Advanced, Matrix, Composite, Search, nBox, Transposed, Trending (any four).'],
['What type is the Job History report?','Advanced.'],
['What type is Hires and Terminations by Quarter?','Trending.'],
['Does seeing a report in the catalog mean you can run it?','No. Security controls running it and the data returned.']],
'custom-reports':[
['How long until a Temporary Report is deleted?','7 days.'],
['What does Optimized for Performance limit?','Field prompts, to indexed fields only.'],
['Where do you change a temporary report’s deletion date?','The Advanced tab.'],
['Which report type shows primary and related object fields with filters, prompts, sharing?','Advanced.']],
'security-framework':[
['Trace the access chain.','User → security group → policy → secured item.'],
['What does a domain group together?','Securable tasks, reports, data sources, fields, and integrations.'],
['What does a BP security policy govern?','Participation in business-process event types.'],
['Does creating a group grant access?','No, not until a policy gives that group permission.']],
'security-groups':[
['Three ways a security group gets members?','Workday-assigned, manually assigned, derived.'],
['Two examples of Workday-assigned groups?','Employee As Self and All Employees.'],
['What is a user’s total access across several groups?','The union of all their groups’ permissions.'],
['What does a group’s context type describe?','What target data its members can reach.']],
'security-policies':[
['Which access levels does a domain policy grant?','View or Modify.'],
['Name four actions a BP policy can control.','Initiate, action, approve, delegate, cancel, rescind, deny (any four).'],
['Can a domain policy inherit permissions?','Yes, from parent domains.']]
};
