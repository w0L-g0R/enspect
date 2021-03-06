import inspect
import os

import pandas as pd
from dash import callback_context, no_update
from dash.dependencies import Input, Output
from dash.exceptions import PreventUpdate
from gui.app import app
from gui.utils import show_callback_context
from settings import eev_indices

from pandas import IndexSlice as IDX


def callback_on_select_eev_dropdowns(
    idx_0: object = no_update,
    idx_1: object = no_update,
    idx_2: object = no_update,
    idx_3: object = no_update,
    idx_4: object = no_update,
    idx_0_disabled: object = no_update,
    idx_1_disabled: object = no_update,
    idx_2_disabled: object = no_update,
    idx_3_disabled: object = no_update,
    idx_4_disabled: object = no_update,
):

    return [
        idx_0,
        idx_1,
        idx_2,
        idx_3,
        idx_4,
        idx_0_disabled,
        idx_1_disabled,
        idx_2_disabled,
        idx_3_disabled,
        idx_4_disabled,
    ]


def create_on_select_eev_dropdowns(graph_id: str):
    @app.callback(
        [
            Output(f"idx-eev-0-{graph_id}", "options"),
            Output(f"idx-eev-1-{graph_id}", "options"),
            Output(f"idx-eev-2-{graph_id}", "options"),
            Output(f"idx-eev-3-{graph_id}", "options"),
            Output(f"idx-eev-4-{graph_id}", "options"),
            Output(f"idx-eev-0-{graph_id}", "disabled"),
            Output(f"idx-eev-1-{graph_id}", "disabled"),
            Output(f"idx-eev-2-{graph_id}", "disabled"),
            Output(f"idx-eev-3-{graph_id}", "disabled"),
            Output(f"idx-eev-4-{graph_id}", "disabled"),
        ],
        [
            Input(f"idx-eev-0-{graph_id}", "value"),
            Input(f"idx-eev-1-{graph_id}", "value"),
            Input(f"idx-eev-2-{graph_id}", "value"),
            Input(f"idx-eev-3-{graph_id}", "value"),
            Input(f"idx-eev-4-{graph_id}", "value"),
        ],
    )
    def on_select_eev_dropdowns(
        idx_0_value: str,
        idx_1_value: str,
        idx_2_value: str,
        idx_3_value: str,
        idx_4_value: str,
    ):

        show_callback_context(
            verbose=True,
            func_name=inspect.stack()[0][3],
            file_name=inspect.stack()[0][1].rsplit(os.sep, 1)[-1].upper(),
        )
        # Get callback information to define the triggered input
        ctx = callback_context
        triggered = ctx.triggered

        only_total = [
            {"label": "Gesamt", "value": "Gesamt"},
        ]

        kohlegase = [
            {"label": "Gesamt", "value": "Gesamt"},
            {"label": "aus Kokereigas", "value": "aus Kokereigas"},
            {"label": "aus Gichtgas", "value": "aus Gichtgas"},
        ]

        biogene = [
            "aus Hausm??ll-Bioanteil",
            "aus Scheitholz",
            "aus Holzpellets",
            "aus Holzabfall",
            "aus Ablauge",
            "aus Deponiegas",
            "aus Kl??rgas",
            "aus Biogas",
            "aus fl??ssigen Biogenen",
            "aus sonst. festen Biogenen",
        ]

        biogene = [{"label": x, "value": x} for x in biogene]

        abf??lle = [
            {"label": "Gesamt", "value": "Gesamt"},
            {
                "label": "aus Industriabfall n. erneuer.",
                "value": "aus Industriabfall n. erneuer.",
            },
            {
                "label": "aus Hausm??ll n. erneuerbar",
                "value": "aus Hausm??ll n. erneuerbar",
            },
        ]

        if triggered:

            # Store the selected dropdown item in a variable
            triggered_prop_id = triggered[0]["prop_id"]
            triggered_value = triggered[0]["value"]

            if "Umwandlungseinsatz" in idx_0_value:
                print("idx_0_value: ", idx_0_value)
                print("idx_1_value: ", idx_1_value)
                # if idx_1_value in [
                #     "Gesamt",
                #     "davon:  Kokerei",
                #     "Hochofen",
                #     "Raffinerie",
                #     "Holzkohlenproduktion",
                #     "Gaserzeugung"

                if idx_1_value == "Gesamt":

                    return callback_on_select_eev_dropdowns(
                        idx_1_disabled=False,
                        idx_2_disabled=True,
                        idx_3_disabled=True,
                        idx_4_disabled=True,
                        idx_1=eev_indices[1],
                        idx_2=only_total,
                        idx_3=only_total,
                        idx_4=only_total,
                    )

                if (
                    "Kraftwerke" in idx_1_value
                    or "KWK" in idx_1_value
                    or "Heizwerke" in idx_1_value
                ):
                    print("sushi")
                    return callback_on_select_eev_dropdowns(
                        idx_1_disabled=False,
                        idx_2_disabled=False,
                        idx_1=eev_indices[1],
                        idx_2=eev_indices[2],
                        idx_3=only_total,
                        idx_4=only_total,
                    )

                else:

                    return callback_on_select_eev_dropdowns(
                        idx_1_disabled=False,
                        idx_2_disabled=True,
                        idx_3_disabled=True,
                        idx_4_disabled=True,
                        # idx_2=only_total,
                        idx_3=only_total,
                        idx_4=only_total,
                    )

                return callback_on_select_eev_dropdowns(
                    idx_1_disabled=False,
                    idx_2_disabled=True,
                    idx_3_disabled=True,
                    idx_4_disabled=True,
                    # idx_2=only_total,
                    idx_3=only_total,
                    idx_4=only_total,
                )

            if "Umwandlungsaussto??" in idx_0_value:

                if idx_1_value in [
                    "Gesamt",
                    "davon:  Kokerei",
                    "Hochofen",
                    "Raffinerie",
                    "Holzkohlenproduktion",
                    "Gaserzeugung",
                ]:

                    print("CASE 1")
                    return callback_on_select_eev_dropdowns(
                        idx_1_disabled=False,
                        idx_2_disabled=True,
                        idx_3_disabled=True,
                        idx_4_disabled=True,
                        # idx_2_disabled=False,
                        idx_1=eev_indices[1],
                        idx_2=only_total,
                        idx_3=only_total,
                        idx_4=only_total,
                    )

                if (
                    "Kraftwerke" in idx_1_value
                    or "KWK" in idx_1_value
                    or "Heizwerke" in idx_1_value
                ):

                    print("CASE 2")

                    idx_3_options = eev_indices[3].copy()

                    if "Heizwerke" in idx_1_value:
                        idx_3_options = idx_3_options[:-3]

                    else:
                        idx_3_options = idx_3_options[:-1]

                    if idx_2_value != "Gesamt":

                        print("CASE 2.1")

                        idx_4_options = only_total
                        idx_4_disabled = True

                        if "Kohlegase" in idx_3_value:
                            print("Kohlegase")
                            idx_4_options = kohlegase
                            idx_4_disabled = False

                        if "Abf??lle" in idx_3_value:
                            print("Abf??lle")
                            idx_4_options = abf??lle
                            idx_4_disabled = False

                        if "Biogenen" in idx_3_value:
                            print("Biogene")
                            idx_4_options = biogene
                            idx_4_disabled = False

                        return callback_on_select_eev_dropdowns(
                            idx_1_disabled=False,
                            idx_2_disabled=False,
                            idx_3_disabled=False,
                            idx_4_disabled=idx_4_disabled,
                            idx_1=eev_indices[1],
                            idx_2=eev_indices[2],
                            idx_3=eev_indices[3],
                            idx_4=idx_4_options,
                        )
                    else:
                        print("CASE 2.2")

                        return callback_on_select_eev_dropdowns(
                            idx_1_disabled=False,
                            idx_2_disabled=False,
                            idx_3_disabled=True,
                            idx_4_disabled=True,
                            idx_2=eev_indices[2],
                            idx_3=only_total,
                            idx_4=only_total,
                        )
            print("CASE EXIT")

            # CASE: Set all to Gesamt except idx_0
            return callback_on_select_eev_dropdowns(
                idx_1_disabled=True,
                idx_2_disabled=True,
                idx_3_disabled=True,
                idx_4_disabled=True,
                idx_1=only_total,
                idx_2=only_total,
                idx_3=only_total,
                idx_4=only_total,
            )
        else:
            raise PreventUpdate
