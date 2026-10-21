/* End-of-lesson TL;DR: the exam facts to remember from each lesson, checked against the lesson, its study notes, and the
   exam guide requirements in guide.js (including the task names the guide says to know).
   Each bullet is "Concept|fact": the bold part names the Workday concept, and the fact must make sense on its own. */
const TLDR={
'job-families':[
'Job catalog|Job family groups contain job families, and job families contain job profiles. Families and family groups are optional.',
'Create Job Family|The task that creates a job family. Enter an effective date and a Job Family Name.',
'Assigning a job profile to a family|Pick the family in the Job Family field on the job profile (Create Job Profile or Edit Job Profile). One job profile can be in more than one family.',
'Reporting on the job catalog|The Job Catalog report shows family groups, families, and profiles together. The Job Family report shows which profiles are in each family.',
'Where job families are used|Compensation eligibility rules, condition rules, Job Family hiring restrictions, job-based security groups, and Recruiting career-site categories.',
'New job profile + eligibility rule|If a compensation eligibility rule is based on a job family, add every new job profile to that family. Otherwise compensation will not default when someone is hired into it.'],

'job-profiles':[
'Job profile|A reusable, generic description of a job. Jobs and positions are created from it, every worker must have one, and one profile can back many positions.',
'Required job profile fields|Only Job Profile Name, Job Code, and the effective date. If job codes are generated (ID Sequence Generator in Edit Tenant Setup - HCM), Job Code is no longer required.',
'Optional job profile fields|Job title, Restrict to Country, management level, job level, job classification, job family, qualifications, job exempt, pay rate type, and compensation grade.',
'Values that default from the job profile at hire|Management level, job classification, company insider types, and work shift.',
'Position value vs job profile value|If the position and the job profile both have a value for the same field, Workday uses the position\'s value.'],

'job-management':[
'Job Management|Hiring restrictions are set once on the supervisory organization (Hiring Restrictions business process) and apply to every job in it. No open position is needed to hire.',
'Headcount under Job Management|There is no limit. You can hire as many workers as meet the restrictions.',
'Worker leaves (Job Management)|The job ends. There is no vacancy, no position history, and reporting shows current headcount only.',
'Hiring restriction options|Job family, job profile, location, worker type, worker sub type, time type, or No Job Restrictions (pick at least one). Availability Date and Earliest Hire Date are required.',
'Changing the staffing model|Edit Staffing Model (organization\'s Related Actions) or Maintain Staffing Models (up to 100 organizations). Only possible until hiring restrictions are set or positions are created.',
'Mixed staffing models|Subordinate organizations inherit the parent\'s staffing model but can be changed, so one hierarchy can use both models.'],

'position-management':[
'Position Management|You need an open, approved position before you can hire, promote, demote, or transfer a worker into the organization.',
'Position after the worker leaves|The position stays open until it is filled again or closed manually.',
'Create Position|Sets restrictions on each position. Required: Job Posting Title, Number of Positions, Availability Date, and Earliest Hire Date, plus at least one restriction or No Job Restrictions.',
'Edit Position Restrictions|Changes a position\'s restrictions for future hires only, not the current worker.',
'Position Management reporting|Open and filled positions, position history, and time to fill. You can also assign company, cost center, and region to unfilled positions.',
'Picking the staffing model on the exam|Control of each seat, vacancy tracking, or position history means Position Management. Fast, flexible, high-volume hiring means Job Management.'],

'staffing-processes':[
'Preparing an organization for Hire|Position Management: Create Position. Job Management: Set Hiring Restrictions (the Hiring Restrictions business process).',
'Hire missing from Related Actions|The supervisory organization has no position or no hiring restrictions yet.',
'Hire|Brings a worker into a supervisory organization under either staffing model. Records hire date, position, employee type, job profile, time type, and location; weekly hours default from the location.',
'Hire subprocesses and steps|Propose Compensation Hire, Change Organization Assignments for Worker, the Review Employee Hire action, and the Create Workday Account service step.',
'Change Job and Termination subprocesses|Change Job: Propose Compensation Change, Change Organization Assignments, Assign Roles. Termination: Assign Roles and Manage Business Processes for Worker.',
'Correct vs Cancel vs Rescind|Correct changes an in-progress or completed event and needs a comment. Cancel stops an in-progress event. Rescind reverses a completed event.'],

'change-job':[
'Change Job business process|One process covers promotions, demotions, transfers, lateral moves, and changes to location or position data.',
'Start Job Change vs Transfer, Promote or Change Job|Start Job Change is the manager task with simple template questions. Transfer, Promote or Change Job is the administrator task with the full guided editor.',
'Change Job subprocesses|Change Organization Assignments for Worker, Propose Compensation Change, Assign Pay Group, Assign Roles - Change Assignments for Worker, and Manage Business Processes for Worker.',
'Request Transfer|Lets a manager start a transfer for a worker they do not have access to yet.',
'Change Job reasons|Maintain Event Categories and Reasons maps your reasons to five delivered types: Transfer, Promotion, Lateral Move, Demotion, and Data Change.',
'Change Job security|A group needs the Change Job business process policy to start it, plus the domain policies to see each section. Rescinding Change Job does not undo role changes.'],

'termination':[
'Starting a termination|Terminate Employee (manager or HR), Submit Resignation (worker; needs the Review Worker Initiated Termination step), or Severance.',
'Termination date|The last day of employment. The worker shows as terminated just after midnight in their own time zone.',
'Termination steps|Manage Business Processes for Worker reassigns or cancels the leaver\'s tasks, Assign Roles moves their roles, and Terminate User Account ends system access. Questionnaires and Create Job Requisition are also common.',
'Job overlap vs No Show|Job overlap lets a replacement share the position for a time (Position Management only). No Show replaces termination when a new hire never starts.',
'Termination security|A group on the Termination business process policy can start it but cannot see the Reason or Details sections without domain policies such as Staffing Actions: Termination Details.'],

'compensation':[
'Package, grade, grade profile|A package groups compensation grades and plans. A grade sets a pay range. A grade profile localizes that range, for example by country and currency.',
'Pay outside the grade range|Gives a warning, not an error.',
'Compensation eligibility rules|Decide which workers can receive each compensation component. Two rules on one component use OR logic.',
'When pay defaults|In Hire (Propose Compensation Hire) and Change Job (Propose Compensation Change), only when the worker is eligible for exactly one package and one grade, and the plan is in that package.',
'When pay does not default|Eligible for two packages or two grades: nothing defaults. Eligible for a plan outside the package: it can be added by hand but does not default.'],

'organization-types':[
'Supervisory organization|The management hierarchy (who manages whom). It holds positions and hiring restrictions, and every worker belongs to exactly one.',
'Other organization types|Company = legal entity. Cost center = revenue and expense. Region = area of responsibility. Location = physical site. Pay group = same payroll rules. Matrix = dotted-line manager.',
'Fields when creating an organization|Availability Date, Name, Code, Subtype, Visibility, and Roles. Supervisory organizations add External URL, Primary Location (required), Staffing Model, and Identifiers.',
'Inherited by subordinate organizations|Visibility, Primary Location, Staffing Model, and Roles, plus default and allowed organization assignments unless overridden.',
'Primary Location|Required on every supervisory organization, so at least one location must exist first.'],

'organization-hierarchies':[
'Organization hierarchy|Rolls up organizations of one type only, such as cost centers, for reporting, security, and role inheritance. It can include other hierarchies of that type.',
'Transactions and hierarchies|Transactions are recorded on the organizations, never on the hierarchy. Costs roll up automatically.',
'Creating a hierarchy|Create Cost Center Hierarchy, Create Location Hierarchy, and the other Create … Hierarchy tasks, run inside a reorganization event (Create Reorganization).',
'Updating a hierarchy|From the hierarchy\'s Related Actions > Reorganization > Assign Included Organizations (Assign Locations for a location hierarchy). Track changes with the Reorganizations report.',
'Changing supervisory organizations|Assign Superior, Create Subordinate, Divide Organization, Inactivate Organization, and Move Workers.',
'Roles on a location hierarchy|Assign location-based roles such as HR Partner (by location) on a location hierarchy, not on a single location, so they inherit down.'],

'organization-assignments':[
'Default organization|The one value per organization type that fills in automatically during staffing, such as the default cost center.',
'Allowed organizations|The values users may choose from during staffing. A blank allowed list means every value of that type is allowed.',
'Setting defaults and allowed values|Edit Supervisory Organization (or edit the position) and enter Default and Allowed values for each organization type.',
'Inherited assignments|A subordinate organization uses its superior\'s default and allowed values unless you enter its own, which override them.',
'Automatic membership|Workers hired or transferred into a supervisory organization join its default organizations. Change Organization Assignments for Worker changes them for one worker.'],

'assignable-roles':[
'Assignable role|Assigned to a position (or job), not the person, so the role stays with the position when the worker changes.',
'What assignable roles control|Role-based security group membership, business process routing, approvals, and notifications.',
'Assign Roles task|From the organization\'s Related Actions > Roles > Assign Roles (Role Maintainers only, no approval), or from the worker\'s Related Actions > Security Profile > Assign Roles - Add/Remove.',
'How a role gets filled|Inherited from the superior organization, assigned directly, or filled by a default role. Roles can also be assigned on unfilled positions.',
'Empty role|If a business process routes to a role no one holds, the task has no one to act on it.',
'Role vs access|A role gives no access by itself. Access needs a role-based security group that is also in a security policy.'],

'bp-framework':[
'What a business process controls|What happens (tasks, actions, subprocesses), who does it (security groups), and when (step order and timing).',
'Business process type|A category of event that Workday delivers, such as Hire or Termination. You cannot create new types.',
'Business process definition|Your configured workflow for a type: its steps, order, who does each step, conditions, notifications, and completion step.',
'Business process event|One transaction running through a definition, such as Hire: Logan McNeil.',
'Step, initiator, target|A step is one task or subprocess. The initiator starts the process. The target is who it is about, such as the new hire.',
'Which definition version runs|The version in effect on the day the event was started.'],

'bp-definitions':[
'Definition types|Default (recommended, easiest to maintain), organization-specific (for an organization with very different steps, covers its subordinates), and rule-based (one condition rule, checked once when the event starts).',
'Which definition runs|A matching rule-based definition first, then the organization-specific definition for the organization or its nearest superior, then the default. Inactive or broken definitions are skipped.',
'Edit Definition|Adds, removes, and orders steps and sets their groups and due dates. Copy and Inactivate Business Process Definition are also available.',
'Step actions in View mode|Set as Completion, Maintain Step Conditions, Maintain Step Delay, Maintain Advanced Routing, and Maintain Step Label Override.',
'Completion step|Commits the data. A process has only one, and every approval and review must come before it.',
'Business Process Configuration Options report|Shows what each business process type allows: valid organization types, allowed actions and approvals, subprocesses, and restrictions.'],

'bp-advanced':[
'Routing restrictions (Maintain Advanced Routing)|Exclude Initiator, Exclude Prior Approvers, and Exclude Event Subject stop people from approving their own or repeated work.',
'Everyone excluded from a step|The step is skipped unless you set an alternate security group.',
'Step delay|Pauses a process before a step, based on the previous step finishing, the start date, or a date field such as Effective Date.',
'Definition version for an event|The definition in effect when the event started, never a future-dated version.',
'Parallel steps|Steps with the same order letter run at the same time.'],

'bp-steps':[
'Initiation step|Defines who can start the process. Always the first step and cannot be removed.',
'Action step|Either a review (the person can edit and approve) or a subprocess.',
'Approval step|Approve, send back, or deny. Approvers cannot edit data, and a denial denies the whole process. Approval chains go up the management chain until the top or an exit condition.',
'Service step vs To Do step|A service step runs Workday automation such as Create Workday Account. A To Do is a reminder for work, and you create To Dos with Maintain To Dos.',
'Consolidated approval|Combines several approvals for the same worker into one task, but only for steps that come before it.'],

'conditions':[
'Entry condition|Decides whether a step runs at all. Works on every step type except Initiation.',
'Validation condition|Checks data on Initiation and review steps. Warning lets the user continue; Critical makes the user fix the data first.',
'While Running condition|Approval chains only. Decides whether the next approver in the chain acts.',
'Exit condition|Approval chains and Integration steps. Decides whether the step can finish, for example stopping a chain after two approvals.',
'Configuring a condition|In View mode, use the step\'s Related Actions > Maintain Step Conditions and build the rule (And/Or, field, operator, value). Test it with Test Rule on an event.',
'Proposed values|Before the completion step, Hire values such as job profile and location are still "proposed" in condition rules.'],

'notifications':[
'Add Notification|From the definition\'s Related Actions > Business Process > Add Notification: choose the trigger, add recipients, then build the subject and body.',
'Notification triggers|The process status (such as Completed), or a step starting or finishing. The trigger and any condition must both be met.',
'Notification fields|Trigger, recipients (participants, other users, or security groups), conditions, delivery, Override Email Template, Do Not Include Notification Details Link, and message text with fields.',
'Notifications and access|A notification never gives access to the process. Fields the recipient cannot see show as [not available].',
'System vs custom notifications|Adding a custom notification does not turn off Workday\'s system notifications.',
'Notification vs step|A notification only informs. If someone must do or approve something, use an Action or Approval step.'],

'standard-reports':[
'Standard reports first|Before building a custom report, check whether a Workday-delivered report already meets the need.',
'Workday Standard Reports report|Lists every delivered report with its type, whether it can be scheduled, and its securing domain. Running it needs Custom Report Administration, and being listed does not mean you can run a report.',
'Standard report types|Each report is XpressO or Report Writer. Only Report Writer reports can be copied (needs Custom Report Creation). Report Writer types: Simple, Advanced, Matrix, Composite, Search, nBox, Trending, Transposed.',
'Standard reports to know|Planning business processes: Business Process Configuration Options and Business Process Definitions for Business Object. Organization activity: Reorganizations and Organization Exception Audit. Job profiles: Job Catalog and Job Family.',
'Report security|You need access to a report\'s securing domain to run it, and security also controls which rows you see.'],

'custom-reports':[
'Data source|The most important choice: it sets the starting population and the primary business object. Pick the smallest data source that has the data, preferably an indexed one.',
'Reporting terms|The primary business object decides which related business objects and fields you can reach. Each instance is a row. If a field is missing, check the data source and object relationships.',
'Creating a custom report|Create Custom Report, Copy Standard Report to Custom Report, or Related Actions > Reporting > Create Custom Report from Here.',
'Editing a custom report|The report\'s Related Actions > Custom Report > Edit. Only owners and report administrators can edit.',
'Advanced report tabs|Columns, Sort, Filter (primary object), Subfilter (related objects, runs first), Prompts, Output, Share, and Advanced (web service, Optimized for Performance).',
'Sharing a custom report|Off by default, and you can share only with users who can access the data source and its filter.'],

'navigation':[
'Search|Predictive results appear after three characters. Use Exact Match for IDs and email addresses.',
'Search prefixes|bp: finds business process definitions, event: finds running events, sup: finds supervisory organizations, org: finds organizations, worker: finds workers. Type ? to list them all.',
'Related Actions|The menu next to an object that shows what you can do with it, based on your security.',
'Proxy|Start Proxy lets a tester act as another user. It works only outside Production, and only unconstrained security groups can be given proxy access.',
'Tenant types|Production holds live data. Sandbox is a copy for testing. Sandbox Preview is a copy with the next release.'],

'security-framework':[
'Security building blocks|Functional areas hold domains and business process types. Each domain and business process type has a security policy listing the security groups allowed.',
'Who owns what|Workday owns functional areas, domains, and business process types. You configure security groups and security policies.',
'Access chain|User → security group → security policy → secured item. A user has access only when every link is in place and policy changes are activated.',
'Domain vs business process security policy|A domain policy controls who can view or modify items (tasks, reports, data sources, fields). A business process policy controls who can start or act on a process type.',
'Group or role without a policy|Creating a security group or assigning a role gives no access until a policy grants that group permission.',
'Troubleshooting access|View Security for Securable Item shows which policies and groups secure an item. Security Analysis for Securable Item and Account shows how one user gets access.'],

'security-groups':[
'How security groups get members|Workday-assigned (All Employees, Employee As Self), manually assigned (user-based groups), or derived from data (role-based and job-based groups).',
'Context types|Unconstrained members reach all target data. Constrained members reach only part of it, usually their organizations or themselves. A user\'s access is the total of all their groups.',
'User-based security group|Always unconstrained. Membership stays with the person through job changes until someone removes it.',
'Role-based security group|Membership follows the role on the position, so access changes automatically when the worker moves.',
'Create Security Group|Creates a group of the type you choose. Edit it later from its Related Actions. For a role-based group, check the role in Maintain Assignable Roles first.',
'Changing group membership|User-based: Assign Users to User-Based Security Group or Assign User-Based Security Groups for Person. Role-based: Assign Roles. Membership changes apply immediately.'],

'security-advanced':[
'Job-based security group|Members are chosen by one job value, such as job profile, job family, or management level. Can be constrained or unconstrained.',
'Location membership vs organization membership group|Location membership groups are always unconstrained. Organization membership groups can be constrained.',
'Aggregation vs intersection group|Aggregation: a member of any included group. Intersection: a member of every included group, with constraints combined.',
'Rule-based security group|Starts from a baseline group (such as Employee As Self) and filters it with a security rule. Changing the rule does not need activation.',
'Segment-based security group|Controls which values members can use, such as document categories or pay components.',
'Non-worker security groups|Service center groups give access to third parties such as an outside help desk. Integration system groups give access to integration system users (ISUs).'],

'security-policies':[
'Domain vs business process policy|A domain policy controls who can see or change items in a domain. A business process policy controls who can take part in a process type.',
'Domain policy permissions|View or Modify (Modify includes View). For integrations, Get or Put (Put includes Get). Child domains inherit from the parent domain.',
'Business process policy permissions|Initiate, act on action steps, delegate, view all, approve, cancel, rescind, manually advance, and deny. One policy per type, shared by all its definitions; subprocesses do not inherit it.',
'Editing policies|Domain: Related Actions > Domain > Edit Security Policy Permissions. Business process: the definition\'s Related Actions > Business Process Policy > Edit.',
'Activating changes|Run Activate Pending Security Policy Changes; Activate Previous Security Timestamp reverts. Group membership changes apply immediately.',
'Template-driven processes (Termination, Change Job)|Need the business process policy plus the domain policy for each section. Can see worker data but cannot start Change Job: check the business process policy.']
};

/* TL;DR for review and test days in the plan, keyed "week-day" (zero-based, as in WEEKS). Exam facts from the lessons that day works on. */
const DAY_TLDR={
'0-3':[
'Job catalog|Job family groups contain job families, and job families contain job profiles. Families and family groups are optional.',
'Job profile vs job vs position|The job profile is the reusable description. A job (Job Management) or a position (Position Management) is the seat a worker fills, created from the profile.',
'Job profile reuse|One job profile can belong to several job families and back many positions.',
'Position value vs job profile value|At hire, a value on the position overrides the same value on the job profile.',
'Job families in rules|Compensation eligibility rules, condition rules, hiring restrictions, and job-based security groups can all use job families.'],
'0-4':[
'Required job profile fields|Only Job Profile Name, Job Code, and the effective date.',
'Generated job codes|With an ID Sequence Generator set in Edit Tenant Setup - HCM, Job Code is no longer required.',
'Create Job Family|Creates a job family. Assign a profile to it with the Job Family field on the job profile.',
'Job Catalog report|Shows job family groups, job families, and job profiles together.',
'New job profile + eligibility rule|If a compensation eligibility rule uses a job family, add the new job profile to that family or pay will not default.'],
'0-5':[
'Job catalog|Job family group → job family → job profile.',
'Values that default from the job profile|Management level, job classification, company insider types, and work shift. The position\'s value wins if both have one.',
'Search prefixes|bp: = business process definitions, event: = running events, sup: = supervisory organizations.',
'Tenant types|Production = live data. Sandbox = test copy. Sandbox Preview = copy with the next release.',
'Proxy|Works only outside Production, and only unconstrained security groups can be given proxy access.'],
'1-2':[
'Where restrictions live|Job Management: on the supervisory organization. Position Management: on each position.',
'Vacancies|Job Management: none, the job ends when the worker leaves. Position Management: the position stays open until filled or closed.',
'Reporting|Job Management: current headcount. Position Management: open and filled positions, position history, and time to fill.',
'Best fit|Job Management for flexible, high-volume hiring. Position Management for control of each seat.',
'Same in both models|The same hiring restriction options and the same Hire business process.'],
'1-3':[
'Scenario mentions approved seats, vacancies, or position history|The answer is Position Management.',
'Scenario mentions high-volume or flexible hiring|The answer is Job Management.',
'Edit Staffing Model not available|The organization already has hiring restrictions or positions.',
'Allow Override of Restrictions on Staffing Events|Set in Edit Tenant Setup - HCM. Restriction values still default in, but users can choose other values.',
'Edit Hiring Restrictions and Edit Position Restrictions|Both change restrictions for future hires only, not the current worker.'],
'1-4':[
'Mixed staffing models|Subordinate organizations inherit the parent\'s staffing model but can be changed, so one hierarchy can use both models.',
'Move Workers (By Organization)|Both organizations must use the same staffing model.',
'Changing the staffing model|Edit Staffing Model or Maintain Staffing Models, only until hiring restrictions are set or positions are created.',
'Job Management reporting|Current headcount only.',
'Position Management reporting|Open and filled positions, position history, and time to fill.'],
'2-3':[
'Hire|Brings a worker into a prepared position (Position Management) or into an organization with hiring restrictions (Job Management).',
'Change Job|One business process for promotions, demotions, transfers, lateral moves, and location or data changes.',
'Request Transfer|Lets the receiving manager start a transfer for a worker they do not have access to yet.',
'Termination|Ends employment. Its steps reassign the worker\'s tasks, move their roles, and end their Workday account.',
'Correct vs Cancel vs Rescind|Correct changes an event and needs a comment. Cancel stops an in-progress event. Rescind reverses a completed one, and rescinding Change Job does not undo role changes.'],
'3-1':[
'Hire step 1: prepare the organization|Position Management needs a position (Create Position). Job Management needs hiring restrictions.',
'Hire step 2: Hire appears|Hire shows in the supervisory organization\'s Related Actions only after step 1.',
'Hire step 3: enter the data|Hire date, position, employee type, job profile, time type, and location.',
'Hire step 4: defaults fill in|Job profile values and weekly hours (from the location) fill in. Position values beat job profile values.',
'Hire step 5: subprocesses|Propose Compensation Hire (pay defaults), Change Organization Assignments, Review Employee Hire, and Create Workday Account.'],
'3-2':[
'Picking the staffing model|Seat control, vacancies, or position history → Position Management. Flexible, high-volume hiring → Job Management.',
'Hire missing from Related Actions|The organization has no position or no hiring restrictions yet.',
'Position value vs job profile value|At hire, the position\'s value wins.',
'Change Job security|Needs the business process policy to start it plus domain policies to see each section.',
'When pay defaults|Only when the worker is eligible for exactly one package and one grade, and the plan is in that package.'],
'3-3':[
'Edit Staffing Model|Available only before hiring restrictions or positions exist.',
'Termination date|The last day of employment. The worker is terminated just after midnight in their own time zone.',
'No Show|Used instead of termination when a new hire never starts. The worker is removed from headcount.',
'Pay outside the grade range|Gives a warning, not an error.',
'New job profile + eligibility rule|Add it to the job family the rule uses, or pay will not default.'],
'4-4':[
'Organization types|Supervisory = who manages whom. Company = legal entity. Cost center = revenue and expense. Region = area of responsibility.',
'Organization hierarchies|Roll up one organization type for reporting and role inheritance. Create them with Create … Hierarchy tasks inside a reorganization event.',
'Default vs allowed organizations|Default fills in one value automatically. Allowed limits which values users can pick. Subordinates inherit both unless overridden.',
'Assignable roles|Assigned to positions, so they stay when the worker changes. An empty role leaves tasks with no one to act on them.',
'Assign Roles task|Organization\'s Related Actions > Roles > Assign Roles, or the worker\'s Related Actions > Security Profile > Assign Roles - Add/Remove.'],
'5-3':[
'Initiation step|Always first. The business process security policy says who can start the process.',
'Action steps in Hire|Review Employee Hire (a review) and subprocesses such as Propose Compensation Hire.',
'Approval step|Approve, send back, or deny. Approvers cannot edit.',
'Service step vs To Do step|Create Workday Account is a service step. A To Do is a reminder for work Workday cannot check.',
'Completion step|Only one per process. It commits the data, and all approvals and reviews come before it.'],
'5-4':[
'Type vs definition vs event|Type = the category Workday delivers. Definition = your configured workflow. Event = one running transaction.',
'Which definition runs|A matching rule-based definition first, then organization-specific (the organization\'s own or its nearest superior\'s), then the default.',
'Editing a definition|Edit Definition for steps, order, and groups. View-mode actions: Set as Completion, Maintain Step Conditions, Maintain Step Delay, Maintain Advanced Routing.',
'Completion step|Only one per process, and all approvals and reviews must come before it.',
'Approval vs Action step|Approvers cannot edit. Use an Action (review) step when someone must edit and approve.'],
'6-3':[
'Entry condition|"Run this step only if…", for example only above a pay threshold or only in one country.',
'Validation condition|"Warn or stop the user if the data is wrong." Warning lets them continue; Critical does not.',
'While Running condition|"Should the next person in the approval chain act?"',
'Exit condition|"Can this approval chain or integration step finish?", for example stop after two approvals.',
'Create Condition Rule vs Maintain Step Conditions|Create Condition Rule saves a rule; Maintain Step Conditions attaches it to a step.'],
'6-4':[
'Condition types|Entry: does the step run? Validation: is the data OK? While Running: does the next chain approver act? Exit: can the step finish?',
'Notifications|Inform people but never give access and never replace a step. Add them with Add Notification on the definition.',
'Routing restrictions|Exclude Initiator, Exclude Prior Approvers, and Exclude Event Subject, set in Maintain Advanced Routing.',
'Which definition version runs|The one in effect when the event started, never a future-dated one.',
'Proposed values|Before the completion step, Hire values used in condition rules are still "proposed".'],
'6-5':[
'Approval vs Action step|Approvers cannot edit. Reviewers in an Action step can edit and approve.',
'Entry vs validation condition|Entry decides whether a step runs. Validation checks the data and warns or blocks.',
'Notification vs step|A notification informs. It never gives access or replaces an approval.',
'System vs custom notifications|Custom notifications do not turn off system notifications.',
'Everyone excluded by a routing restriction|The step is skipped unless an alternate group is set.'],
'7-5':[
'Standard reports first|Check delivered reports before building custom ones. Only Report Writer reports can be copied.',
'Data source|Sets the population and primary business object of a custom report. Pick the smallest one that has the data.',
'Access chain|User → security group → security policy → secured item.',
'User-based vs role-based group|User-based follows the person and is always unconstrained. Role-based follows the position.',
'Aggregation vs intersection group|Aggregation: member of any included group. Intersection: member of every included group.'],
'8-1':[
'User cannot see or run an item|Find the item\'s domain with View Security for Securable Item, then check the user\'s security groups.',
'User cannot start or approve an event|Check the business process security policy for that process type.',
'Template-driven process (Termination, Change Job)|Needs the business process policy and the domain policy for each section.',
'Policy saved but not working|Run Activate Pending Security Policy Changes. Group membership changes need no activation.',
'Access too broad|Check the group\'s constraint. Location membership groups are always unconstrained.'],
'8-2':[
'Exam weights|Staffing 25%, Business Processes 25%, Security 25%, Organizations 20%, Reporting 5%.',
'Exam format|50 questions in 120 minutes, about 2 minutes per question.',
'Picking the staffing model|Vacancies or position history → Position Management. Flexible, high-volume hiring → Job Management.',
'Approval vs Action step|If someone must edit and approve, it is an Action (review) step, not an Approval step.',
'Access|Needs group membership plus a policy permission, and policy changes need activation.'],
'8-3':[
'Completion step|Only one per process, and all approvals and reviews come before it.',
'Default vs allowed organizations|Default fills in one value. Allowed limits the choices.',
'Domain vs business process policy|Domain policy: see or change items. Business process policy: start or act on events.',
'Rule-based definition|One condition rule, checked once when the event starts.',
'Notifications|Never give access. Fields the recipient cannot see show as [not available].'],
'8-4':[
'Default vs allowed|Default proposes one value. Allowed limits which values can be picked.',
'View vs initiate|Seeing worker data comes from a domain policy. Starting an event comes from a business process policy.',
'In progress vs completed events|Cancel an in-progress event. Rescind a completed one. Correct works on either.',
'Pay does not default|The worker is eligible for two packages or two grades, or the plan is outside the package.',
'Proxy|Works only outside Production, and only for unconstrained security groups.']
};
