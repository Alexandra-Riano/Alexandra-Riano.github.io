/* End-of-lesson TL;DR: the few points to remember from each lesson, condensed from the lesson, its study notes, and its exam trap.
   Each lesson: [bullets]. A bullet written "Term|text" shows the term in bold, as in notes.js. */
const TLDR={
'job-families':[
'Hierarchy|Job family group > job family > job profile. Families and groups are optional.',
'Many-to-many|A profile can sit in one or more families; a family can belong to a family group.',
'What they power|Prompt filters, job-profile reports, Recruiting categories, condition rules, eligibility rules, Job Family hiring restrictions, and job-based security.',
'Exam trap|If a compensation eligibility rule uses a family, every new profile must join that family or pay will not default.',
'Not a structure for people|A family classifies work. It is not a supervisory organization or a staffing model.'],

'job-profiles':[
'What it is|A reusable, generic job definition. Jobs and positions are created from it, and every worker needs one.',
'Required fields|Only Job Profile Name, Job Code, and effective date. Job Code stops being required when an ID Definition generates it.',
'Defaults at hire|Management level, job classification, company insider types, and work shift come from the profile.',
'Position beats profile|When both hold a value, Workday uses the position value.',
'Reuse|One profile can back many positions, such as an Executive Assistant profile used in several departments.'],

'job-management':[
'Restrictions on the org|Set once on the supervisory organization and applied to every job in it.',
'No limit, no vacancy|Hire as many workers as fit the restrictions; the job ends when the worker leaves.',
'Reporting|Current headcount only.',
'Restriction criteria|Job family, job profile, location, worker type, worker sub type, time type, or No Job Restrictions. Pick at least one.',
'Exam trap|Edit Staffing Model is available only until restrictions are set or positions exist. Subordinates inherit the model but can change it.'],

'position-management':[
'Open position required|You need an open, approved position to hire, promote, demote, or transfer a worker in.',
'Positions persist|A position exists apart from its incumbent and stays open until filled or closed by hand.',
'Per-position restrictions|Each position has its own restrictions. Edit Position Restrictions affects future hires only.',
'Reporting|Open and filled positions, position history, and time to fill.',
'Choose it when|The scenario needs seat-level control, vacancy tracking, or position history.'],

'staffing-processes':[
'Prepare first|Position Management needs a position (Create Position); Job Management needs hiring restrictions.',
'Missing Hire|If Hire is not in the organization\'s Related Actions, the organization is not prepared yet.',
'Hire records|Hire date, position, employee type, job profile, time type, and location. Weekly hours default from the location.',
'Typical Hire steps|Propose Compensation Hire, Change Organization Assignments, Review Employee Hire, and a Create Workday Account service step.',
'Fixing events|Correct (in progress or completed, needs a comment), Cancel (in progress), Rescind (completed).'],

'change-job':[
'Two starting tasks|Start Job Change for managers (template questions); Transfer, Promote or Change Job for administrators (guided editor).',
'Templates|Maintain Change Job Templates sets fields, sections, subprocesses, reasons, and help text.',
'Reasons|Maintain Event Categories and Reasons maps your reasons to Transfer, Promotion, Lateral Move, Demotion, and Data Change.',
'Request Transfer|For a manager who has no access to the worker yet.',
'Exam trap|Template sections need domain permissions as well as the BP policy, and rescinding Change Job does not undo role changes.'],

'termination':[
'Three ways in|Terminate Employee, Submit Resignation (needs the Review Worker Initiated Termination step), or Severance.',
'Dates|The termination date is the last day of employment; the worker is terminated just after midnight in their own time zone.',
'Clean-up steps|Manage Business Processes for Worker (reassign or cancel tasks), Assign Roles, and Terminate User Account.',
'Job overlap and No Show|Overlap lets a replacement share the position (Position Management only). No Show is for a hire who never started.',
'Exam trap|A group on the Termination BP policy can start it but cannot see Reason or Details without the matching domain policies.'],

'compensation':[
'Building blocks|A package groups grades and plans. A grade gives a pay range; a grade profile localizes it.',
'Ranges are guidance|A salary outside the grade range gives a warning, not an error.',
'Eligibility rules|Decide who can receive each component. Two rules on one component use OR.',
'When pay defaults|Only when the worker is eligible for exactly one package and grade, and the plan is in that package.',
'Exam trap|Eligible for a plan outside the package means selectable but not defaulted. Two packages or grades means nothing defaults.'],

'organization-types':[
'Supervisory org|The management hierarchy. It holds positions and restrictions, and every worker belongs to exactly one.',
'Other types|Company (legal entity), cost center (revenue and expense), region (area of responsibility), pay group, location, and matrix (dotted line).',
'Inherited by subordinates|Visibility, Primary Location, Staffing Model, and Roles.',
'Locations first|Primary Location is required on a supervisory org, so create a location before it.',
'Custom types|Only when delivered types do not fit.'],

'organization-hierarchies':[
'One type each|A hierarchy rolls up organizations of its own type only, and can include other hierarchies of that type.',
'No transactions|Transactions are recorded on organizations; costs roll up automatically.',
'Roles on hierarchies|Assign location-based roles such as HR Partner (by location) on a location hierarchy, not a single location.',
'Reorganization events|Group related changes under one effective date. Track them with the Reorganizations report.',
'Purpose|Reporting rollups and role inheritance. The management chain does not change.'],

'organization-assignments':[
'Default|The one value that fills in automatically during staffing.',
'Allowed|The values users may pick. A blank allowed list means any value of that type.',
'Keep them aligned|A default should also be in the allowed list.',
'Inheritance|Subordinates use their superior\'s values unless they have their own; entering a value overrides it.',
'Automatic membership|Workers hired or transferred in join the organization\'s default organizations.'],

'assignable-roles':[
'Attached to the chair|A role belongs to a position or job, not the person, so it survives incumbent changes.',
'What roles drive|Role-based security, business process routing, approvals, and notifications.',
'Inheritance|Roles can be inherited from the superior, assigned directly, or filled by a Default Role.',
'Risk|An unassigned role can leave workflow tasks with no one to act on them.',
'Exam trap|A role alone grants nothing. Access needs group membership plus a policy permission.'],

'bp-framework':[
'Type|The event category Workday delivers, such as Hire. You cannot add types.',
'Definition|Your configured workflow for a type: steps, order, groups, conditions, notifications, completion.',
'Event|One transaction running through a definition, such as Hire: Logan McNeil.',
'Which version runs|The definition in effect on the initiation date.',
'Planning tool|Business Process Configuration Options shows what each type allows.'],

'bp-definitions':[
'Default first|Workday recommends one default definition because it is easiest to maintain.',
'Organization-specific|For an organization whose steps differ greatly; it covers that organization and its subordinates.',
'Rule-based|One condition rule, evaluated once at initiation. Use it when the same rule would sit on three or more steps.',
'Fallback order|Rule-based match, then the organization\'s or nearest superior\'s definition, then the default. Inactive or broken ones are skipped.',
'Completion step|Commits the data. Only one per process, and every approval and review comes before it.'],

'bp-advanced':[
'Routing restrictions|Exclude Initiator, Exclude Prior Approvers, or Exclude Event Subject, set in Maintain Advanced Routing.',
'All excluded|The step is skipped unless you name an alternate group.',
'Step delay|Pauses before a step, based on the prior step, the initiation date, or a field like Effective Date.',
'Version rule|An event uses the definition in effect when it is initiated, never a future-dated one.',
'Parallel steps|Steps with the same order letter run at the same time.'],

'bp-steps':[
'Initiation|Always first and cannot be removed.',
'Action|A review (can edit and approve) or a subprocess.',
'Approval|Approve, send back, or deny. No editing, and a denial denies the whole process.',
'Service vs To Do|Service runs Workday automation; To Do is a reminder you create with Maintain To Dos.',
'Consolidated approval|Combines approvals for one worker, but only for steps before it.'],

'conditions':[
'Entry|Should the step run? Works on every step except Initiation.',
'Validation|May the process continue? Warning lets the user continue; Critical makes them fix the data.',
'While Running|Approval chains only: does the next approver act?',
'Exit|Approval chains and Integration steps: may the step complete?',
'Exam trap|Create Condition Rule only saves a rule; Maintain Step Conditions attaches it. Before completion, Hire data is still "proposed".'],

'notifications':[
'Triggers|Process status (such as Completed), or a step being entered or exited. Trigger and condition must both be met.',
'Recipients|Participants, other users, or security groups.',
'No access granted|Receiving a notification never grants access, and fields the recipient cannot see show as [not available].',
'System vs custom|Adding a custom notification does not turn off system notifications.',
'Not a step|A notification informs. Use an Approval or Action when work is required.'],

'standard-reports':[
'Check delivered first|Look for a standard report before building a custom one.',
'Workday Standard Reports|Lists every delivered report with type, schedulable flag, and securing domain. Seeing a report there does not mean you can run it.',
'Copying|Only Report Writer reports can be copied, and that needs Custom Report Creation.',
'Reports to know|Business Process Configuration Options, Business Process Definitions for Business Object, Reorganizations, Job Catalog.',
'Security|Access to a report and the rows you see both depend on security.'],

'custom-reports':[
'Data source first|It sets the population and the primary object, and it matters most for performance. Pick the smallest one that works.',
'Objects decide fields|The primary object decides which related objects and fields you can reach.',
'Filter vs subfilter|Filter works on the primary object; subfilter works on related objects and runs first.',
'Sharing|Off by default, and only to users who can access the data source and its filter.',
'Exam trap|Missing a field? Check the data source and object relationships, not the columns.'],

'navigation':[
'Tenants|Production holds live data; Sandbox is a test copy; Sandbox Preview adds the next release.',
'Search prefixes|bp: for definitions, event: for events, sup: for supervisory orgs, org: for organizations, worker: for workers. Type ? for all.',
'Related Actions|Show what you can do with an object, based on your security.',
'Proxy|Start Proxy lets testers act as another user, but never in Production, and only unconstrained groups get proxy access.',
'Releases|Two feature releases a year plus weekly service updates.'],

'security-framework':[
'Access chain|User > security group > policy > secured item.',
'Domain policy|Who can view or modify items in a domain (tasks, reports, data sources, fields).',
'BP policy|Who can initiate or act on a business process type.',
'Exam trap|Creating a group or assigning a role grants nothing until a policy gives that group permission.',
'Troubleshoot|View Security for Securable Item, then Security Analysis for Securable Item and Account.'],

'security-groups':[
'Membership methods|Workday-assigned (All Employees, Employee As Self), manually assigned (user-based), or derived (role-based, job-based).',
'Context types|Unconstrained reaches all targets; constrained reaches a subset, usually by organization.',
'User-based|Always unconstrained and follows the person through job changes until removed.',
'Role-based|Follows the role on the position, so access updates when the worker moves.',
'Union|A user\'s access is the total of all their groups\' permissions.'],

'security-advanced':[
'Job-based|One job criterion, such as job profile, job family, or management level. Constrained or unconstrained.',
'Location vs organization membership|Location membership is always unconstrained; organization membership can be constrained.',
'Aggregation vs intersection|Aggregation: members of any included group. Intersection: members of all included groups, constraints intersected.',
'Rule-based|A baseline group filtered by a security rule. Changing the rule needs no activation.',
'Non-workers|Service center groups for third parties; integration system groups for ISUs.'],

'security-policies':[
'Domain policy|View or Modify (Get or Put for integrations). Modify includes View; child domains inherit from the parent.',
'BP policy|One per process type, shared by all its definitions. Subprocesses do not inherit it.',
'Activation|Policy edits stay pending until Activate Pending Security Policy Changes. Group membership changes apply at once.',
'Template-driven processes|Termination and Change Job need the BP policy plus domain access to each section.',
'Exam trap|Can view data but cannot start Change Job? Check the Change Job BP policy, not the domains.']
};

/* TL;DR for review and test days in the plan, keyed "week-day" (zero-based, as in WEEKS). Each one pulls together the lessons that day works on. */
const DAY_TLDR={
'0-2':[
'Catalog layers|Job family group > job family > job profile. Families and groups are optional; profiles are not.',
'Profile vs job vs position|The profile is the reusable definition. A job (Job Management) or position (Position Management) is the staffable instance created from it.',
'Many-to-many|One profile can be in several families and back many positions.',
'Defaults|Profile values default at hire, but a value on the position wins.',
'Why families matter|Eligibility rules, condition rules, hiring restrictions, and job-based security can all use them.'],
'0-3':[
'Required profile fields|Job Profile Name, Job Code, and effective date. Everything else is optional.',
'Family rule trap|A new profile must join any family an eligibility rule uses, or pay will not default.',
'Job Catalog report|Shows family groups, families, and profiles together.',
'Every worker|Needs a job profile, whether hired or contracted.',
'Classification only|A family classifies work. It is not an organization or a staffing model.'],
'0-4':[
'Say it aloud|Family group > family > profile > job or position > worker.',
'Profile|Reusable definition with name, code, and effective date required.',
'Families|Optional groupings for filters, reports, Recruiting, rules, restrictions, and security.',
'Position beats profile|The more specific value wins at hire.',
'Weak cards|Rework them before Week 2. Staffing models build directly on the catalog.'],
'1-2':[
'Restriction level|Job Management: the supervisory organization. Position Management: each position.',
'Vacancies|Job Management: none, the job ends when the worker leaves. Position Management: the position stays open until filled or closed.',
'Reporting|Job Management: current headcount. Position Management: open and filled positions, history, time to fill.',
'Best fit|Job Management for flexible, high-volume hiring. Position Management for seat-level control.',
'Shared|The same restriction criteria and the same Hire process in both models.'],
'1-3':[
'Read the scenario|"Every approved seat", "vacancies", or "position history" means Position Management.',
'Volume and speed|"Many hires", "flexible", or "no persistent vacancy" means Job Management.',
'Can\'t change model?|Restrictions are set or positions exist, so Edit Staffing Model is no longer available.',
'Overrides|Edit Tenant Setup - HCM can let users override restrictions; the values still default in.',
'Future vs current|Edit Hiring Restrictions and Edit Position Restrictions affect future hires, not the current worker.'],
'1-4':[
'Hybrid hierarchy|Subordinates inherit the parent\'s staffing model but can change it, so one hierarchy can mix models.',
'When it makes sense|Mix control for some teams (Position Management) with volume hiring for others (Job Management).',
'Moving workers|Move Workers (By Organization) needs both organizations on the same staffing model.',
'Choose early|Pick the model before staffing begins; Edit Staffing Model disappears after that.',
'Target|80%+ on practice before moving on.'],
'2-1':[
'1. Prepare|Position Management: Create Position. Job Management: set hiring restrictions.',
'2. Hire appears|Only then does Hire show in the organization\'s Related Actions.',
'3. Enter|Hire date, position, employee type, job profile, time type, and location.',
'4. Defaults|Job profile values and weekly hours from the location fill in; position values beat profile values.',
'5. Subprocesses|Propose Compensation Hire, Change Organization Assignments, Review Employee Hire, Create Workday Account.'],
'2-2':[
'Hire|Brings a worker into a prepared position or job.',
'Change Job|Promotions, demotions, transfers, lateral moves, and location or data changes, all through one business process.',
'Transfer without access|Request Transfer lets the receiving manager start it.',
'Termination|Ends employment; clean up tasks, roles, and the Workday account.',
'Undoing things|Correct keeps data; Cancel stops an in-progress event; Rescind reverses a completed one. Rescinding Change Job does not undo role changes.'],
'2-3':[
'Five Staffing objectives|Job families, job profiles, Job Management, Position Management, staffing business processes.',
'Most tested|Choosing the staffing model from a scenario.',
'Missing Hire|The organization has no position or no hiring restrictions yet.',
'Defaults|Position beats profile; weekly hours come from the location.',
'Family trap|New profiles must join families that eligibility rules use.'],
'2-4':[
'For each miss|Name the decision rule you broke, not just the right answer.',
'Model questions|Look for vacancy, history, and control words.',
'Process questions|Check what must exist before Hire.',
'Fix events|Correct, Cancel, or Rescind depends on whether the event is in progress or complete.',
'Confidence|Rate each objective so the next recovery day targets the weakest.'],
'3-4':[
'Organization types|Supervisory = who manages whom. Company = legal. Cost center = money. Region = responsibility area.',
'Hierarchies|Roll up one organization type for reporting and role inheritance. Transactions stay on organizations.',
'Assignments|Default fills in one value; allowed limits the choices. Subordinates inherit both unless overridden.',
'Roles|Attached to the position, so they survive incumbent changes. Empty roles leave tasks unassigned.',
'Connect them|Roles on a location hierarchy inherit down; assignments on the supervisory org default into staffing.'],
'4-3':[
'Initiation|Always first. The BP policy says who can start it.',
'Reviews and subprocesses|Action steps, such as Review Employee Hire and Propose Compensation Hire.',
'Approvals|Approve, send back, or deny. No editing.',
'Automation and reminders|Service step for Create Workday Account; To Do for work Workday cannot check.',
'Completion|One completion step commits the data. Every approval and review comes before it.'],
'4-4':[
'Type, definition, event|Delivered category, your configured workflow, one running transaction.',
'Which definition runs|Rule-based match, then organization-specific (own or nearest superior), then default.',
'Completion step rule|Only one, and all approvals and reviews come before it.',
'Approval vs Action|Approvers cannot edit. Use an Action review when someone must edit.',
'Version|The definition in effect on the initiation date runs.'],
'5-2':[
'Entry|"Only run this step if…" (threshold, country, worker type).',
'Validation|"Stop or warn the user if the data is wrong." Warning lets them continue; Critical does not.',
'While Running|"Does the next person in the approval chain act?"',
'Exit|"Can this approval chain or integration step finish?" For example, stop after two approvals.',
'Attach it|Create Condition Rule saves it; Maintain Step Conditions puts it on a step.'],
'5-3':[
'Conditions|Entry, validation, while running, exit. Each works only on certain step types.',
'Notifications|Inform people but never grant access or replace a step.',
'Proposed data|Before completion, Hire values are still "proposed" in conditions.',
'Field security|Fields a recipient cannot see show as [not available].',
'System vs custom|Custom notifications do not turn system ones off.'],
'5-4':[
'Rebuild a workflow from memory|Initiation, reviews, approvals, service steps, completion, notifications.',
'Then add logic|An entry condition, a validation, and a routing restriction.',
'Check yourself|Which step commits data? Who is excluded? When does each condition run?',
'Common misses|Approval vs Action, entry vs validation, notification vs step.',
'Write it down|Note each rule you missed for the mock exams.'],
'6-4':[
'Reports|Check standard reports first. Only Report Writer reports can be copied.',
'Custom reports|The data source sets the population and primary object; pick the smallest that works.',
'Access chain|User > security group > policy > secured item.',
'Groups|Role-based follows the position; user-based follows the person and is always unconstrained.',
'Target|80%+ on both domains. Reporting is 5% of the exam; Security is 25%.'],
'7-1':[
'Can\'t see or run something?|Find its domain with View Security for Securable Item, then check the user\'s groups.',
'Can\'t start or approve an event?|Check the BP policy for that process type.',
'Template-driven process?|Needs the BP policy and each section\'s domain.',
'Saved but not working?|Activate Pending Security Policy Changes. Membership changes need no activation.',
'Too broad?|Check the group\'s constraint. Location membership groups are always unconstrained.'],
'7-2':[
'Weights|Staffing 25%, Business Processes 25%, Security 25%, Organizations 20%, Reporting 5%.',
'Pacing|50 questions in 120 minutes: about 2 minutes each. Flag and move on.',
'Scenario keywords|Vacancy or history → Position Management. Edit while approving → Action, not Approval.',
'Access questions|Membership plus policy, and policies need activation.',
'Afterwards|Write the decision rule behind every miss.'],
'7-3':[
'Sort misses|By domain and by the rule you broke.',
'Three weakest objectives|Reread their TL;DRs and exam traps, then retake their lesson quizzes.',
'Recurring traps|Staffing model choice, completion step, condition types, BP vs domain policy.',
'Explain aloud|If you can\'t explain the rule without notes, it isn\'t fixed yet.',
'Flashcards|Rate honestly so missed cards come back sooner.'],
'7-4':[
'Exam conditions|One sitting, 120 minutes, no notes.',
'Target|85%+ with time to spare.',
'Read carefully|Watch for "default" vs "allowed", "view" vs "initiate", "in progress" vs "completed".',
'Eliminate|Two options are usually off-domain. Choose between the remaining two by the rule.',
'Done|If you hit the target, you are exam-ready.']
};
