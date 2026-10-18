// Extra flashcards per lesson, drawn from that lesson's text and the course books. Each entry is [front, back].
// The lesson's original card (field 9 in app.js) stays first and keeps its saved progress.
const C={
"job-families":[
["Can one job profile belong to more than one job family?","Yes. A profile may belong to one or more families."],
["What groups job families into a broader layer?","A job family group."],
["Name three things job families can support.","Prompt filters, reports, Recruiting categories, condition rules, eligibility rules (any three)."]],
"job-profiles":[
["When is job code not required on a job profile?","When job-code generation is configured."],
["Name four optional job-profile fields.","Title, management level, classifications, pay rate type, compensation grade, qualifications, country restriction, description (any four)."],
["Job profile vs job or position?","Profile is the reusable definition; job or position is the staffable instance in an organization."]],
"job-management":[
["Is an open position required to hire under Job Management?","No."],
["When does a job end under Job Management?","When the worker leaves."],
["What reporting does Job Management support?","Current headcount only."],
["Changing a parent org’s staffing model changes existing subordinates?","No. Use Edit Staffing Model on each subordinate."],
["Name the hiring restriction criteria.","Job family, job profile, location, worker type, worker sub type, time type, or No Job Restrictions."]],
"position-management":[
["Which actions need an open, approved position?","Hire, promote, demote, or transfer."],
["When does a position close?","When it is filled or manually closed."],
["Which organizations can you assign to an unfilled position?","Company, cost center, and region."],
["When does Edit Staffing Model stop being available?","Once positions exist (Position Management) or hiring restrictions are set (Job Management)."]],
"staffing-processes":[
["Which Hire subprocess sets pay?","Propose Compensation Hire."],
["Which Hire service step gives system access?","Create Workday Account (creates the account and emails a temporary password)."],
["What prepares a Job Management org for Hire?","Setting hiring restrictions on the organization."],
["Name the six fields required to complete a hire.","Hire date, position, employee type, job profile, time type, location."]],
"organization-types":[
["How many primary supervisory organizations can a worker have?","One."],
["Name four organization types besides supervisory.","Company, cost center, region, pay group, location, custom (any four)."],
["What staffing model does a new subordinate start with?","Its parent’s staffing model."],
["Which supervisory org fields inherit to subordinates?","Visibility, Primary Location, Staffing Model, Roles."],
["Four visibility options?","Everyone; Role Assignees; Role Assignees and Members; Role Assignees of Current and Superiors."]],
"organization-hierarchies":[
["What does a reorganization event do?","Groups organization changes under one common effective date."],
["Can a cost center hierarchy hold companies?","No. A hierarchy holds only its own organization type."],
["Does a cost-center hierarchy change the management chain?","No. It rolls up cost centers for reporting only."],
["Where do you assign HR Partner (by location)?","On a location hierarchy, not on individual locations."]],
"organization-assignments":[
["Should a default value normally also be allowed?","Yes."],
["What can worker organization assignments populate downstream?","Worktags on downstream transactions."],
["Where do you see that a subordinate inherits assignments?","The Inherited from Superior check box on the Organization Assignments tab."],
["How do you override an inherited assignment?","Enter a value on the subordinate organization."]],
"assignable-roles":[
["Name three things assignable roles can drive.","Role-based security membership, business-process routing, reporting responsibility."],
["Does a role grant access by itself?","No. Group membership plus policy permission produces access."],
["Can role assignments inherit to subordinate orgs?","Yes, assignments may inherit to subordinates."]],
"bp-framework":[
["What is a business process type?","The event category (for example, Hire)."],
["What does a BP definition specify?","Steps, order, responsible security groups, conditions, notifications, and completion."],
["Two hires, same definition: how many events?","Two. Each hire is its own event."]],
"bp-definitions":[
["Order Workday checks for a BP definition?","A rule-based definition whose rule is met; else the org's or nearest superior's definition; else the default."],
["When use an organization-specific definition?","When an org’s steps differ greatly from the default."],
["What must come before the completion step?","All approvals and reviews (later To Dos may remain)."],
["What controls whether an individual step runs?","Condition rules on that step."],
["Three kinds of BP definitions?","Default, organization-specific, and rule-based."],
["When does Workday check a rule-based definition's rule?","Once, at initiation."]],
"bp-steps":[
["Which step type starts the event?","Initiation."],
["What can an Action step do?","Prompt a review (with editing) or start a subprocess."],
["What does completing a To Do prove?","The click, not necessarily that the outside work happened."],
["Which steps can a consolidated approval include?","Only steps before it."]],
"conditions":[
["Which condition can block progress, and on which steps?","Validation, on Initiation or Action steps."],
["What does a While Running condition decide?","Whether the next approval-chain member acts."],
["What does an Exit condition decide?","Whether a supported approval-chain or integration step can complete."],
["Does an Entry condition apply to the Initiation step?","No. Entry decides whether a non-initiation step begins."],
["Warning vs Critical validation?","Warning: user can continue. Critical: user must fix the data."],
["Why use \"proposed\" fields before completion?","Hire data is not on the worker record until completion."]],
"notifications":[
["What can trigger a BP notification?","Process status, or step entry or exit."],
["Name four things you configure on a notification.","Effective date, recipients, trigger, conditions, delivery, content (any four)."],
["Can a notification replace an Approval step?","No. It informs; it does not require or automate work."],
["Do custom notifications turn off system ones?","No."],
["Trigger plus condition: when does it send?","Only when both are met."]],
"standard-reports":[
["Name four report types.","Simple, Advanced, Matrix, Composite, Search, nBox, Transposed, Trending (any four)."],
["Which report plans business process configuration?","Business Process Configuration Options."],
["Which reports track organization activity?","Reorganizations and Organization Exception Audit."],
["Does seeing a report in the catalog mean you can run it?","No. Security controls running it and the data returned."],
["Which task hides a standard report from search?","Hide Workday Delivered Report."]],
"custom-reports":[
["How long until a Temporary Report is deleted?","7 days."],
["What does Optimized for Performance limit?","Field prompts, to indexed fields only."],
["Where do you change a temporary report’s deletion date?","The Advanced tab."],
["Which report type shows primary and related object fields with filters, prompts, sharing?","Advanced."],
["Which runs first: filter or subfilter?","Subfilter."],
["Biggest factor in report performance?","The data source."]],
"security-framework":[
["Trace the access chain.","User → security group → policy → secured item."],
["What does a domain group together?","Securable tasks, reports, data sources, fields, and integrations."],
["What does a BP security policy govern?","Participation in business-process event types."],
["Does creating a group grant access?","No, not until a policy gives that group permission."]],
"security-groups":[
["Three ways a security group gets members?","Workday-assigned, manually assigned, derived."],
["Two examples of Workday-assigned groups?","Employee As Self and All Employees."],
["What is a user’s total access across several groups?","The union of all their groups’ permissions."],
["What does a group’s context type describe?","What target data its members can reach."]],
"security-policies":[
["Which access levels does a domain policy grant?","View or Modify."],
["Name four actions a BP policy can control.","Initiate, action, approve, delegate, cancel, rescind, deny (any four)."],
["Can a domain policy inherit permissions?","Yes, from parent domains."],
["What does a template-driven process need for security?","Both the BP security policy and the domain policies for its sections."]],
"change-job":[
["Which change types can reasons map to?","Transfer, Promotion, Lateral Move, Demotion, Data Change."],
["What does Request Transfer allow?","A group without direct access to the worker can start a transfer."],
["Moving a manager: what happens to their teams?","Move all eligible teams or none; each moves by its own Assign Superior."],
["Is Assign Roles rescinded with Change Job?","No. New role assignments persist."]],
"termination":[
["Three ways to start a termination?","Terminate Employee, Submit Resignation, Severance."],
["What does Manage Business Processes for Worker show?","The worker's tasks, processes about them, and delegations."],
["What is job overlap?","Two workers share one position for a limited time (Position Management only)."],
["When do you use No Show?","A hire never reports for day one."]],
"compensation":[
["Grade vs grade profile?","Grade: pay range guidance. Grade profile: a localized range (such as by country)."],
["When does compensation default?","Eligible for exactly one package and grade, and the plan is in the package."],
["Salary outside the grade range?","A warning, not an error."],
["What links a plan to payroll?","A compensation element."]],
"bp-advanced":[
["Three routing restrictions?","Exclude Initiator, Exclude Prior Approvers, Exclude Event Subject."],
["Which definition version does an event use?","The one in effect when it is initiated."],
["What does a step delay do?","Pauses the process before a step runs."],
["Steps with the same order letter?","Run in parallel; all must finish before the next step."]],
"navigation":[
["Production vs Sandbox vs Sandbox Preview?","Live data; a test copy; a copy with the next release."],
["How do you list all search prefixes?","Type ? in the search box."],
["Where can you proxy as another user?","Only in non-production tenants."],
["What is the Workday Touchpoints Kit?","A visual map of data flows and configuration relationships."]],
"security-advanced":[
["Aggregation vs intersection?","Aggregation: any included group. Intersection: all included groups, constraints intersected."],
["Location membership groups are…","Always unconstrained."],
["What is a rule-based security group?","A baseline group filtered by a security rule."],
["Groups for non-workers?","Service center and integration system."]]
};
