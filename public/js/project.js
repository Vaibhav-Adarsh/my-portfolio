const projectFilters = document.querySelectorAll(".project-filter");
const projectCards = document.querySelectorAll(".project-card");
const emptyProjectsMessage = document.querySelector(".no-projects");

projectFilters.forEach((filterButton) => {
    filterButton.addEventListener("click", () => {
        const selectedFilter = filterButton.dataset.filter;
        let visibleProjects = 0;

        projectFilters.forEach((button) => {
            const isSelected = button === filterButton;
            button.classList.toggle("is-active", isSelected);
            button.setAttribute("aria-pressed", String(isSelected));
        });

        projectCards.forEach((card) => {
            const categories = card.dataset.categories?.split(" ") ?? [];
            const shouldShow = selectedFilter === "all" || categories.includes(selectedFilter);

            card.hidden = !shouldShow;
            if (shouldShow) {
                visibleProjects += 1;
            }
        });

        if (emptyProjectsMessage) {
            emptyProjectsMessage.hidden = visibleProjects > 0;
        }
    });
});
