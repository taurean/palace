# Changelog

## v1.2.0

**Template Foundation Expansion**

This release establishes a foundation for Palace's template library by adding 20+ new template types across entertainment, professional, personal, and organizational content. The new templates (except Publish) are currently basic variants of the core note template, providing structure that will be enhanced with specialized properties and functionality in future releases.

**Note:** These templates serve as starting points that users can customize immediately, with more specific features coming in future updates.

**New Foundational Templates**

*Entertainment & Media*
- Movie, Video, and Video Game templates for tracking entertainment experiences
- Show and Show Season templates for serialized content
- Podcast and Podcast Episode templates for audio content
- Playlist template for music and media organization

*People & Social*
- Person template for individual contact and relationship tracking
- Person Group template for teams and organizations

*Location & Geography*
- Place template for specific locations with coordinates and notes
- Region template for broader geographic areas

*Work & Professional*
- Meeting template for meeting notes with attendees and decisions
- Protocol template for standard procedures and processes
- Software template for tracking software projects and tools
- Website template for web project management

*Personal Wellness & Development*
- Health Record template for medical and wellness tracking
- Reflection template for introspection and personal growth
- Trip template for travel experiences and itineraries
- Quest template for personal goals and objectives
- Milestone template for significant life events

*Food & Culinary*
- Food template for ingredients and food items
- Recipe template for cooking instructions and variations

*System & Organizational*
- MOC (Map of Content) template for organizing related notes
- Draft template for works-in-progress
- Object template for generic reference materials

*Publishing*
- Publish template for content publication workflows (fully developed)

**Property Standardization**
- Updated Dynamic Time base to use `kind` property instead of `entityIs` for better consistency

**Looking Ahead**
This foundational release brings the total template count to 39, establishing structure for a comprehensive content type system. Future releases will enhance these templates with specialized properties, custom fields, and tailored functionality for each content type.

## v1.1.0

**Almanac Notes Natural Language Enhancement**

This release significantly improves the almanac notes system with more powerful and flexible natural language date parsing.

**Natural Language Parsing**
- Integrated chrono-node library for robust natural language date parsing
- Enhanced date input flexibility - now accepts a much wider variety of date formats and natural expressions
- Improved resilience in handling different date input styles and edge cases
- Bundled chrono-node for distribution with the almanac notes plugin

**Bug Fixes & Improvements**
- Fixed daily notes JSON configuration issues
- Updated almanac templates for better consistency and functionality

This release makes creating almanac notes significantly more intuitive by understanding natural language date inputs more reliably.

## v1.0.0

**First Stable Release - Palace 1.0**

This is the first production-ready release of Palace, marking it as a stable, comprehensive Obsidian vault starter template. Palace now provides a complete foundation for personal knowledge management with 40+ collections, extensive templates, and powerful organizational tools.

**Almanac System Enhancements**
- Added contextual examples in almanac modal for better user guidance
- Standardized almanac properties across all templates (Daily, Weekly, Monthly, Quarterly, Yearly) using `startDate` and `endDate`
- Updated almanac templates with improved week logic and Sunday-start support
- Enhanced almanac notes plugin with better date parsing and navigation

**Documentation & Onboarding**
- Added comprehensive roadmap for Palace 1.0 release showing all phases and planned features
- Created new "First Steps" checklist for new users
- Completely revised Getting Started guide with clearer structure and comprehensive guidance
- Renamed and rewrote "Palace Decisions" guide for better clarity ("How to Think About Palace")
- Updated README with improved content, formatting, and clearer instructions
- Improved system documentation throughout

**Collections & Content Management**
- Enabled pinning for collection notes using `#pinned` tag
- Enhanced Correspondences collection with detailed views
- Added Organizations collection with comprehensive structure
- Updated collection formatting and presentation

**System Configuration**
- Updated Obsidian hotkey configurations for improved workflow
- Standardized wikilinks to use hyphenated slugs for consistency
- Cleaned up file naming conventions (lowercase, hyphenated)
- Refined view configurations across collections
- Reverted accent color to default for better compatibility

**Templates & Bases**
- Refined Daily Note template structure and navigation
- Updated Dynamic Time base with dedicated views for Days, Weeks, Months, and Quarters
- Fixed formula errors in almanac bases for better date handling
- Improved template consistency across all note types

**Quality & Polish**
- Fixed various typos and formatting issues
- Cleaned up unnecessary documentation files
- Standardized file naming throughout the vault
- Improved overall vault organization and structure

This release represents the culmination of extensive refinement and testing, providing users with a mature, well-documented starting point for their Obsidian vaults.

## v0.12.0
- **Almanac Property Standardization**
  - Standardized all almanac templates (Daily, Weekly, Monthly, Quarterly, Yearly) to use `startDate` and `endDate` properties
  - Migrated `Dynamic Time.base` to use these standard properties for consistent views
- **Dynamic Time Base Improvements**
  - Added dedicated views for **Items Created**, **Days**, **Weeks**, **Months**, and **Quarters**
  - Fixed formula errors for "Day" formatting and "Quarter" display
  - Improved filters to correctly handle full-day queries (including the end date)
  - Fixed syntax errors in duration calculations and link handling

## v0.11.0
- **Daily Note Template Refinement**
  - Simplified navigation header with compact Previous/Next links
  - Added placeholder for base content
- **Almanac System Improvements**
  - **Weekly Notes**: Updated to Sunday-start logic with Week Year (`gggg`) support
  - **Daily Notes**: Aligned week properties with new Sunday-start logic
  - **Templates**: Standardized navigation and structure across Monthly, Quarterly, and Yearly notes
  - **Scripts**: Enhanced `almanacNotes.js` week parsing for better locale support
- **Collection Updates**
  - **Correspondences**: Added detailed views for Email, Letter, and Memo; updated collection page with table of contents
  - **Organizations**: Added description and directory entry
- **Documentation & Directory**
  - Updated `directory.md` with new entries and formatting improvements
  - Updated Roadmap progress

## v0.10.0

- **New Almanac Notes System (Preview)**
  - Added comprehensive almanac notes system with support for daily, weekly, monthly, and quarterly notes
  - Implemented 'Almanac Notes' plugin with direct hotkey support for quick note creation
  - Added natural language date parsing for flexible date input
  - Implemented 'nearest instance' logic and day-of-week support for smart date navigation
  - Fixed various UX issues including cleanup of untitled notes and template visibility
  - Integrated with Templater for seamless template execution and note creation
  - **Note:** This is a preview feature. Templates, bases, and collections for almanac notes will be finalized in a future release.

- **New Content Type: Correspondence**
  - Added new Correspondence note kind for tracking letters, emails, and other communications
  - Added new medium type support for correspondence tracking

- **Property Standardization**
  - Renamed property fields from singular to plural for consistency:
    - `creator` → `creators`
    - `region` → `regions`
  - Renamed 'periodic' to 'almanac' throughout codebase for clearer terminology
  - Pluralized kinds across templates and collections

- **Content Management Improvements**
  - Updated Article Clipper template with enhanced features and adjustments
  - Changed pinning system: now use `#pinned` tag anywhere in a note instead of dedicated property
  - Removed tags from sample notes and clippings for cleaner examples

- **System Cleanup**
  - Removed Calendar plugin from default plugin set
  - Removed legacy "directory" references from collection files
  - Removed default aliases from collection index files
  - Removed extraneous wiki-link pipe separators for cleaner syntax
  - Updated Obsidian workspace configuration

- **Template Fixes**
  - Fixed template to use target date instead of current date for accurate context
  - Improved Templater integration and workflow

## v0.9.0
- **File Switcher Enhancement**
  - Added Obsidian file switcher configuration for improved navigation
- **Template Improvements**
  - Updated Article Clipper template with enhanced features and better structure
  - Streamlined template links by removing "Collection" suffix for cleaner references
- **Documentation Updates**
  - Updated documentation structure and content throughout Palace vault
  - Added Palace design decisions and opinions documentation
  - Enhanced system documentation with clearer guidance
- **Content Management**
  - Added View Later document for tracking unfinished content and media
  - Introduced sample notes for better user onboarding
  - Added new collection base files for albums, articles, books, and cities
- **Collections Enhancement**
  - Added Comic Series and Comic Issues collections with templates
  - Created Course Lessons collection with base configuration and template
  - Added Courses collection for educational content tracking
  - Added Organization collection for business and entity management
- **System Types**
  - Added new date, entry, parent, and visited property types
  - Enhanced type system for better content organization
- **View Configuration**
  - Updated Obsidian views for notes and cities collections
  - Improved collection file organization and naming consistency
- **Maintenance**
  - Removed unnecessary sample files and planning documents
  - Cleaned up obsolete files and plugin configurations
  - Updated core Obsidian configuration settings

## v0.8.0
- **Major Configuration Updates**
  - Updated Obsidian configuration settings for improved user experience
  - Enhanced plugin configurations and core plugin settings
  - Improved daily notes configuration with better template paths
  - Updated property types configuration with new regional support
- **New Templates and Collections**
  - Added Cities Collection for tracking locations with geographic data
  - Created City template with location properties and mapping integration
  - Added Basic Note template for general purpose notes
  - Enhanced Albums, Articles, and Books collections with better structure
- **Content Organization**
  - Added system bases for saved queries and data views
  - Created sample notes including Oakland city example and Grocery List
  - Introduced view-later.md for tracking unfinished media
  - Renamed publish.md to public.md for better clarity
- **System Improvements**
  - Updated getting-started documentation with expanded guidance
  - Enhanced directory structure and navigation
  - Improved home dashboard with better media tracking
  - Updated Types documentation with clearer property descriptions
- **Plugin Cleanup**
  - Removed obsolete Leaflet plugin files and configurations
  - Streamlined plugin dependencies for better performance
  - Updated Road to prod documentation (renamed from "Road to prod.md")

## v0.7.0
- Update note type documentation and roadmap progress
- Created a new template for Obsidian clipper to clip books
- Added examples of book and article notes
- Added collection notes for albums, articles, and books
- Added templates for books and albums
- Updated Article Clipper template structure and properties
- Renamed `release-date` property to `publish-date` in types documentation and configuration
- Removed old clipper template for videos as part of template reorganization

## v0.6.0
- Update Album template and add sample album note
- Update Road to prod with expanded entity todo list
- Add Album template for Obsidian notes
- Update types in .obsidian/types.json
- Remove empty collections and templates
## v0.5.0
- **New Features**
  - Added toggle comment hotkey for quick commenting/uncommenting
  - Maps now automatically include a "contains" property for better organization
- **Improvements**
  - Simplified plugin set by removing unnecessary plugins to keep Palace more streamlined
  - Updated Obsidian workspace configuration for better user experience
  - Reorganized collections and system folders for improved structure
- **Maintenance**
  - Cleaned up work-in-progress search bases
  - Updated README and project documentation
  - Improved development workflow setup

## v0.4.0
- updated folder structure to be a bit easier to understand. `curtain/` is now `system`. some of the old folders/files in `system` have been moved out to be more visible.

## v0.3.0
==May 2025==: *I've let this sit for a few months while I use my own version of this in my daily life. I'm coming back and making some tweaks including starting to use the upcoming **[bases](https://help.obsidian.md/bases)** feature.*
- tweaked `README.md` for clarity
- added Road to 1.0 doc
- tweaked formatting of Directory
- added empty placeholder files in `curtain/bases/`, `curtain/collection`, and `curtain/template`

## v0.2.0
- added `.gitignore`
- updated `README.md`
- tweaked home note settings
- added clipper templates for articles and videos
- added templates for Articles, Videos, Daily notes, Weekly notes, and Basic notes
- Added a collection note for Articles
- updated workspace config to layout panels

## v0.1.0
- added plugins and plugin configurations
- set up basic folder / file structure
