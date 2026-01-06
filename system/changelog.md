# Changelog

## v0.11.0
- **Daily Note Template Refinement**
  - Simplified navigation header with compact Previous/Next links
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
